<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import Selecter from '$lib/components/selecter';
	import Inputer from '$lib/components/inputer';
	import Labeler from '$lib/components/labeler';
	import type { ISelectItem } from '$lib/types/selectItem';
	import { Eye, EyeOff, Loader2 } from 'lucide-svelte';
	import { confetti } from '@neoconfetti/svelte';
	import { titleEmoji } from '$lib/stores/stores';
	import { ScoreLevelList } from '$lib/types/score';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import toast from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';

	// 月薪
	// let monthlySalary: number;
	// 年薪
	// let annualSalary: number;
	// 薪酬类型(true:年薪，false:月薪)
	let isYearlySalary: boolean = true;
	let lastSalaryTypeIsYearly: boolean = true;
	$: yearlySalaryMsg = isYearlySalary ? $_('annual_salary') : $_('monthly_salary');
	$: {
		if (isYearlySalary !== lastSalaryTypeIsYearly && salary > 0) {
			if (lastSalaryTypeIsYearly) {
				salary = salary / 12
			} else {
				salary = salary * 12
			}
			lastSalaryTypeIsYearly = isYearlySalary
		}
	}
	$: salaryTips = (): string => {
		let t =
			$_('pre_tax') +
			' ' +
			yearlySalaryMsg +
			$_('comma') +
			$_('includes_a_variety_of_awards_and_subsidies');
		if (!isYearlySalary && salary > 0) {
			t += $_('comma')+ $_('estimated_annual_salary') +$_('colon') + salary * 12;
		}
		return t;
	};
	// 薪酬
	let salary: number;
	// 平均日薪
	$: dalySalary = Number((isYearlySalary ? salary / 365 : (salary * 12) / 365).toFixed(2));
	// 平均时薪
	$: hourlySalary = Number((dalySalary / (workingHours - fishingTime)).toFixed(2));

	// 工作环境
	$: workingEnv = [
		{
			value: 0.85,
			label: $_('working_env_085')
		},
		{
			value: 0.9,
			label: $_('working_env_090')
		},
		{
			value: 1.0,
			label: $_('working_env_010')
		},
		{
			value: 1.05,
			label: $_('working_env_105')
		}
	];
	let workingEnvVal: ISelectItem;
	// 异性
	$: sexEnv = [
		{
			value: 0.98,
			// label: '没有好看的'
			label: $_('sex_env_098')
		},
		{
			value: 1.0,
			// label: '不多不少'
			label: $_('sex_env_100')
		},
		{
			value: 1.02,
			// label: '有很多好看的'
			label: $_('sex_env_102')
		}
	];
	let sexEnvVal: ISelectItem;
	// 同事
	$: colleagueEnv = [
		{
			value: 0.98,
			// label: 'SB很多'
			label: $_('colleague_env_098')
		},
		{
			value: 1.0,
			// label: '基本上都是普通同事'
			label: $_('colleague_env_100')
		},
		{
			value: 1.02,
			// label: '优秀的大佬很多'
			label: $_('colleague_env_102')
		}
	];
	let colleagueEnvVal: ISelectItem;
	// 综合环境系数
	let finalEnvCoefficient = 1;
	// $: finalEnvCoefficient = workingEnvVal.value * sexEnvVal.value * colleagueEnvVal.value;

	// 休息日
	$: restDays = [
		{
			value: 0.8,
			// label: '月休2天及以下'
			label: $_('rest_days_080')
		},
		{
			value: 0.85,
			// label: '月休3天'
			label: $_('rest_days_085')
		},
		{
			value: 0.9,
			// label: '单休'
			label: $_('rest_days_090')
		},
		{
			value: 0.95,
			// label: '大小周'
			label: $_('rest_days_095')
		},
		{
			value: 1.0,
			// label: '双休'
			label: $_('rest_days_100')
		},
		{
			value: 1.05,
			// label: '双休以上'
			label: $_('rest_days_105')
		}
	];
	let restDaysVal: ISelectItem;
	// 上班时间
	$: workingTime = [
		{
			value: 0.95,
			// label: '早上8点左右上班'
			label: $_('working_time_095')
		},
		{
			value: 0.1,
			// label: '早上9点左右上班'
			label: $_('working_time_010')
		},
		{
			value: 1.05,
			// label: '早上10点以后上班'
			label: $_('working_time_105')
		}
	];
	let workingTimeVal: ISelectItem;
	// 下班后工作
	$: otWorking = [
		{
			value: 0.85,
			// label: '下班后经常义务加班'
			label: $_('ot_working_085')
		},
		{
			value: 0.95,
			// label: '下班后偶尔少量义务加班'
			label: $_('ot_working_095')
		},
		{
			value: 1.0,
			// label: '下班后不怎么加班'
			label: $_('ot_working_100')
		}
	];
	let otWorkingVal: ISelectItem;
	// 综合休息系数
	let finalRestCoefficient = 1;
	// $: finalRestCoefficient = restDaysVal.value * workingTimeVal.value * otWorkingVal.value;

	// 工作时长
	let workingHours: number;
	// 通勤时长
	let commutingTime: number;
	// 摸鱼时长
	let fishingTime: number;

	// 学历系数
	$: degrees = [
		{
			value: 0.9,
			// label: '专科及以下'
			label: $_('degrees_090')
		},
		{
			value: 1.0,
			// label: '普通本科'
			label: $_('degrees_100')
		},
		{
			value: 1.1,
			// label: '211/985 本科'
			label: $_('degrees_110')
		},
		{
			value: 1.6,
			// label: '普通硕士'
			label: $_('degrees_160')
		},
		{
			value: 1.8,
			// label: '211/985 硕士'
			label: $_('degrees_180')
		},
		{
			value: 2.0,
			// label: '普通博士'
			label: $_('degrees_200')
		},
		{
			value: 2.4,
			// label: '211/985 博士'
			label: $_('degrees_240')
		}
	];
	let degreeVal: ISelectItem;
	// 城市系数
	$: city = [
		{
			value: 1.1,
			// label: '一线城市'
			label: $_('city_110')
		},
		{
			value: 1.05,
			// label: '新一线城市'
			label: $_('city_105')
		},
		{
			value: 1.0,
			// label: '二线城市'
			label: $_('city_100')
		},
		{
			value: 0.9,
			// label: '三线及以下城市'
			label: $_('city_090')
		}
	];
	let cityVal: ISelectItem;

	// 最终计算得出的工作性价比
	let finalScore: number;
	let finalScoreLevel: string;
	let finalScoreEvaluate: string;
	let calculateLoading: boolean = false;

	function preRecalculate(): boolean {
		finalScore = 0;
		finalEnvCoefficient = 1;
		finalRestCoefficient = 1;

		if (
			!workingHours ||
			!finalEnvCoefficient ||
			!finalRestCoefficient ||
			!dalySalary ||
			!degreeVal ||
			!cityVal
		) {
			return false;
		}

		return true;
	}

	function calculate() {
		if (!preRecalculate()) {
			toast.error($_('params_require'));
			return;
		}
		calculateLoading = true;
		setTimeout(() => {
			// 环境系数
			if (workingEnvVal) {
				finalEnvCoefficient *= workingEnvVal.value;
			}
			if (sexEnvVal) {
				finalEnvCoefficient *= sexEnvVal.value;
			}
			if (colleagueEnvVal) {
				finalEnvCoefficient *= colleagueEnvVal.value;
			}

			// 休息系数
			if (restDaysVal) {
				finalRestCoefficient *= restDaysVal.value;
			}
			if (workingTimeVal) {
				finalRestCoefficient *= workingTimeVal.value;
			}
			if (otWorkingVal) {
				finalRestCoefficient *= otWorkingVal.value;
			}

			// 计算最终值
			let a = dalySalary * finalEnvCoefficient * finalRestCoefficient;

			// console.log(`
			// workingHours ${workingHours}
			// commutingTime ${commutingTime} ${0.5 * commutingTime}
			// fishingTime ${fishingTime} ${0.5 * fishingTime}
			// degreeVal.value ${degreeVal.value}
			// cityVal.value ${cityVal.value}
			// ${workingHours + 0.5 * commutingTime - 0.5 * fishingTime}
			// ${25 * (workingHours + 0.5 * commutingTime - 0.5 * fishingTime) * degreeVal.value * cityVal.value}
			// `);

			let b =
				25 *
				(Number(workingHours) + 0.5 * Number(commutingTime) - 0.5 * Number(fishingTime)) *
				degreeVal.value *
				cityVal.value;

			finalScore = Math.sqrt(a / b);
			finalScore = Number(finalScore.toFixed(2));

			// console.log(a, '----', b);

			// 生成描述
			ScoreLevelList.forEach((v) => {
				if (finalScore >= v.min && finalScore < v.max) {
					let idx = Math.floor(Math.random() * v.meme.length);
					finalScoreEvaluate = v.meme[idx];
					finalScoreLevel = v.level;
					titleEmoji.set(v.emoji);
				}
			});

			calculateLoading = false;

			// 返回顶部
			document.body.scrollTop = document.documentElement.scrollTop = 0;
			// console.log(finalScore);
		}, 200);
	}

	// 填充示例数据
	function demoVal() {
		salary = 12000 * 12;
		isYearlySalary = true;
		workingEnvVal = workingEnv[3];
		sexEnvVal = sexEnv[0];
		colleagueEnvVal = colleagueEnv[1];
		restDaysVal = restDays[4];
		workingTimeVal = workingTime[2];
		otWorkingVal = otWorking[1];
		workingHours = 19 - 10;
		commutingTime = 0.5;
		fishingTime = 1.5 + 4;
		degreeVal = degrees[1];
		cityVal = city[0];
	}

	// 结果展示板
	let showDalySalary: boolean = false;
	let showHourlySalary: boolean = false;
	const buttonIconClass = 'h-4 w-4';

	// debug
	// onMount(() => {
	// 	demoVal();
	// 	setTimeout(() => {
	// 		calculate();
	// 	}, 50);
	// });

	// locale.subscribe(() => {
	// workingEnv = workingEnvFunc();
	// console.log(workingEnv);
	// workingEnv = [...workingEnv]
	// console.log(workingEnv)
	// sexEnv = sexEnvFunc();
	// colleagueEnv = colleagueEnvFunc();
	// restDays = restDaysFunc();
	// workingTime = workingTimeFunc();
	// otWorking = otWorkingFunc();
	// degrees = degreesFun();
	// city = cityFunc();
	// });
</script>

<div>
	{#if finalScore > 0}
		<div class="flex justify-center">
			<div
				use:confetti={{
					particleSize: 10,
					stageHeight: 1024,
					stageWidth: 1024
				}}
			></div>
		</div>
		<Card class="mb-6 bg-primary text-white">
			<CardHeader>
				<CardTitle>
					{$_('price-performance_ratio_of_work')}&nbsp;&nbsp;-&nbsp;&nbsp;{finalScoreLevel}
					{$titleEmoji}
				</CardTitle>
				<CardDescription>
					<div class="text-white">
						{finalScoreEvaluate}
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div>{$_('composite_index')}：{finalScore}</div>
				<div class="flex gap-1">
					{$_('daily_salary')}：
					<button
						class="flex items-center gap-2"
						on:click={() => {
							showDalySalary = !showDalySalary;
						}}
					>
						{#if showDalySalary}
							<Eye class={buttonIconClass} />
						{:else}
							<EyeOff class={buttonIconClass} />
						{/if}
						{#if showDalySalary}
							{dalySalary}
						{:else}
							****
						{/if}
					</button>
				</div>
				<div class="flex gap-1">
					{$_('hourly_salary')}：
					<button
						class="flex items-center gap-2"
						on:click={() => {
							showHourlySalary = !showHourlySalary;
						}}
					>
						{#if showHourlySalary}
							<Eye class={buttonIconClass} />
						{:else}
							<EyeOff class={buttonIconClass} />
						{/if}
						{#if showHourlySalary}
							{hourlySalary}
						{:else}
							****
						{/if}
					</button>
				</div>
				<div>{$_('env_coefficient')}: {finalEnvCoefficient}</div>
			</CardContent>
		</Card>
	{/if}

	<Card>
		<CardHeader>
			<CardTitle></CardTitle>
			<CardDescription></CardDescription>
		</CardHeader>
		<CardContent>
			<form>
				<div class="grid w-full items-center gap-4">
					{#key $locale}
						<Labeler label={$_('salary')} tips={salaryTips()}>
							<Inputer bind:value={salary}>
								<Switch id="id-year-salary" bind:checked={isYearlySalary} />
								<Label for="id-year-salary">{yearlySalaryMsg}</Label>
							</Inputer>
						</Labeler>

						<Labeler label={$_('working_env')}>
							<Selecter bind:source={workingEnv} bind:selectedVal={workingEnvVal} />
						</Labeler>

						<Labeler label={$_('opposite_sex')}>
							<Selecter bind:source={sexEnv} bind:selectedVal={sexEnvVal} />
						</Labeler>

						<Labeler label={$_('colleague')}>
							<Selecter bind:source={colleagueEnv} bind:selectedVal={colleagueEnvVal} />
						</Labeler>

						<Labeler label={$_('rest_days')}>
							<Selecter bind:source={restDays} bind:selectedVal={restDaysVal} />
						</Labeler>

						<Labeler label={$_('time_for_work')}>
							<Selecter bind:source={workingTime} bind:selectedVal={workingTimeVal} />
						</Labeler>

						<Labeler label={$_('work_overtime')} tips={$_('work_overtime_tips')}>
							<Selecter bind:source={otWorking} bind:selectedVal={otWorkingVal} />
						</Labeler>

						<Labeler
							label={$_('working_time')}
							tips={$_('starting_work_time') + $_('ending_work_time')}
						>
							<Inputer bind:value={workingHours} />
						</Labeler>

						<Labeler label={$_('commuting_time')} tips={$_('commuting_time_tips')}>
							<Inputer bind:value={commutingTime} />
						</Labeler>

						<Labeler
							label={$_('mess_around_time')}
							tips={$_('time_for_no_working') +
								'+' +
								$_('time_for_eating') +
								'+' +
								$_('time_for_lunch_break')}
						>
							<Inputer bind:value={fishingTime} />
						</Labeler>

						<Labeler label={$_('degree')}>
							<Selecter bind:source={degrees} bind:selectedVal={degreeVal} />
						</Labeler>

						<Labeler label={$_('city')}>
							<Selecter bind:source={city} bind:selectedVal={cityVal} />
						</Labeler>
					{/key}
				</div>
			</form>
		</CardContent>
		<CardFooter class="gap-3">
			<Button class="w-1/2" on:click={calculate}>
				{#if calculateLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{$_('calculate')}
			</Button>
			<Button variant={'outline'} class="w-1/2" on:click={demoVal}>{$_('demo_val')}</Button>
		</CardFooter>
	</Card>
</div>
