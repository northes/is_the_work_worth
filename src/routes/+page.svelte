<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import Selecter from '$lib/components/selecter';
	import Inputer from '$lib/components/inputer';
	import Labeler from '$lib/components/labeler';
	import type { ISelectItem } from '$lib/types/selectItem';
	import { Loader2 } from 'lucide-svelte';
	import { confetti } from '@neoconfetti/svelte';
	import { titleEmoji } from '$lib/stores/stores';
	import { ScoreLevelList } from '$lib/types/score';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import toast from 'svelte-french-toast';


	// 月薪
	// let monthlySalary: number;
	// 年薪
	// let annualSalary: number;
	// 薪酬类型(true:年薪，false:月薪)
	let isYearlySalary: boolean = true;
	$: yearlySalaryMsg = isYearlySalary ? '年薪' : '月薪';
	$: salaryTips = (): string => {
		let t = '税前' + yearlySalaryMsg + '，包含各种奖与各种补贴';
		if (!isYearlySalary && salary > 0) {
			t += '，计算可得年薪: ' + salary * 12;
		}
		return t;
	};
	// 薪酬
	let salary: number;
	// 平均日薪
	$: dalySalary = Number((isYearlySalary ? salary / 365 : salary * 12 / 365).toFixed(2));
	$: console.log(dalySalary);
	// 平均时薪
	$: hourlySalary = Number((dalySalary / (workingHours - fishingTime)).toFixed(2));

	// 工作环境
	const workingEnv: ISelectItem[] = [
		{
			value: 0.85,
			label: '偏僻地区或郊区的工厂、工地、艰苦户外等'
		},
		{
			value: 0.9,
			label: '工厂、工地、艰苦户外等'
		},
		{
			value: 1.0,
			label: '普普通通'
		},
		{
			value: 1.05,
			label: 'CBD、体制内'
		}
	];
	let workingEnvVal: ISelectItem;
	// 异性
	const sexEnv: ISelectItem[] = [
		{
			value: 0.98,
			label: '没有好看的'
		},
		{
			value: 1.0,
			label: '不多不少'
		},
		{
			value: 1.02,
			label: '有很多好看的'
		}
	];
	let sexEnvVal: ISelectItem;
	// 同事
	const colleagueEnv: ISelectItem[] = [
		{
			value: 0.98,
			label: 'SB很多'
		},
		{
			value: 1.0,
			label: '基本上都是普通同事'
		},
		{
			value: 1.02,
			label: '优秀的大佬很多'
		}
	];
	let colleagueEnvVal: ISelectItem;
	// 综合环境系数
	let finalEnvCoefficient = 1;
	// $: finalEnvCoefficient = workingEnvVal.value * sexEnvVal.value * colleagueEnvVal.value;

	// 休息日
	const restDays: ISelectItem[] = [
		{
			value: 0.8,
			label: '月休2天及以下'
		}, {
			value: 0.85,
			label: '月休3天'
		}, {
			value: 0.9,
			label: '单休'
		}, {
			value: 0.95,
			label: '大小周'
		}, {
			value: 1.0,
			label: '双休'
		}, {
			value: 1.05,
			label: '双休以上'
		}
	];
	let restDaysVal: ISelectItem;
	// 上班时间
	const workingTime: ISelectItem[] = [
		{
			value: 0.95,
			label: '早上8点左右上班'
		}, {
			value: 0.10,
			label: '早上9点左右上班'
		}, {
			value: 1.05,
			label: '早上10点以后上班'
		}
	];
	let workingTimeVal: ISelectItem;
	// 下班后工作
	const otWorking: ISelectItem[] = [
		{
			value: 0.85,
			label: '下班后经常义务加班'
		},
		{
			value: 0.95,
			label: '下班后偶尔少量义务加班'
		},
		{
			value: 1.0,
			label: '下班后不怎么加班'
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
	const degrees: ISelectItem[] = [
		{
			value: 0.9,
			label: '专科及以下'
		},
		{
			value: 1.0,
			label: '普通本科'
		},
		{
			value: 1.1,
			label: '211/985 本科'
		},
		{
			value: 1.6,
			label: '普通硕士'
		},
		{
			value: 1.8,
			label: '211/985 硕士'
		},
		{
			value: 2.0,
			label: '普通博士'
		},
		{
			value: 2.4,
			label: '211/985 博士'
		}
	];
	let degreeVal: ISelectItem;
	// 城市系数
	const city: ISelectItem[] = [
		{
			value: 1.1,
			label: '一线城市'
		},
		{
			value: 1.05,
			label: '新一线城市'
		},
		{
			value: 1.0,
			label: '二线城市'
		},
		{
			value: 0.9,
			label: '三线及以下城市'
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

		switch (0) {
			case dalySalary:
			case finalEnvCoefficient:
			case finalRestCoefficient:
			case workingHours:
				return false;
		}

		if (!degreeVal) {
			return false;
		}

		if (!cityVal) {
			return false;
		}

		return true;
	}

	function calculate() {
		if (!preRecalculate()) {
			toast.error("有空没填/没选")
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
			let b = 25 * (
				workingHours + 0.5 * commutingTime - 0.5 * fishingTime
			) * degreeVal.value * cityVal.value;

			console.log(a, '--', b);

			finalScore = Math.sqrt(a / b);
			finalScore = Number(finalScore.toFixed(2));

			// 生成描述
			ScoreLevelList.forEach((v, i) => {
				if (finalScore >= v.min && finalScore < v.max) {
					let idx = Math.floor((Math.random() * v.meme.length));
					finalScoreEvaluate = v.meme[idx];
					finalScoreLevel = v.level;
					titleEmoji.set(v.emoji);
				}
			});

			calculateLoading = false;

			// 返回顶部
			document.body.scrollTop = document.documentElement.scrollTop = 0;
			console.log(finalScore);

		}, 200);
	}

	// 填充示例数据
	function demoVal() {
		salary = 12000 * 12;
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
</script>

<div>
	{#if finalScore > 0}
		<div class="flex justify-center">
			<div use:confetti={{
				particleSize: 10,
				stageHeight: 1024,
				stageWidth: 1024
			}}>
			</div>
		</div>
		<Card class="mb-6 bg-primary text-white">
			<CardHeader>
				<CardTitle>
					工作性价比&nbsp;&nbsp;-&nbsp;&nbsp;{finalScoreLevel} {$titleEmoji}
				</CardTitle>
				<CardDescription>
					<div class="text-white">
						{finalScoreEvaluate}
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>综合指数：{finalScore}</p>
				<p>日薪：{dalySalary}</p>
				<p>时薪：{hourlySalary}</p>
				<p>环境系数：{finalEnvCoefficient}</p>
			</CardContent>
		</Card>
	{/if}

	<Card>
		<CardHeader>
			<CardTitle>
			</CardTitle>
			<CardDescription>
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form>
				<div class="grid w-full items-center gap-4">
					<Labeler label={"薪酬"} tips={salaryTips()}>
						<Inputer bind:value={salary}>
							<Switch id="id-year-salary" bind:checked={isYearlySalary} />
							<Label for="id-year-salary">{yearlySalaryMsg}</Label>
						</Inputer>
					</Labeler>

					<Labeler label="工作环境">
						<Selecter source={workingEnv} bind:selectedVal={workingEnvVal} />
					</Labeler>

					<Labeler label="异性">
						<Selecter source={sexEnv} bind:selectedVal={sexEnvVal} />
					</Labeler>

					<Labeler label="同事">
						<Selecter source={colleagueEnv} bind:selectedVal={colleagueEnvVal} />
					</Labeler>

					<Labeler label="休息日">
						<Selecter source={restDays} bind:selectedVal={restDaysVal} />
					</Labeler>

					<Labeler label="上班时间">
						<Selecter source={workingTime} bind:selectedVal={workingTimeVal} />
					</Labeler>

					<Labeler label="加班" tips={"义务加班，不给钱的那种"}>
						<Selecter source={otWorking} bind:selectedVal={otWorkingVal} />
					</Labeler>

					<Labeler label={"工作时长"} tips={"下班时间-上班时间"}>
						<Inputer bind:value={workingHours} />
					</Labeler>

					<Labeler label={"通勤时长"} tips={"包括上下班来回时长"}>
						<Inputer bind:value={commutingTime} />
					</Labeler>

					<Labeler label={"摸鱼时长"} tips={"不干活时长+吃饭时长+午休时长"}>
						<Inputer bind:value={fishingTime} />
					</Labeler>

					<Labeler label="学历">
						<Selecter source={degrees} bind:selectedVal={degreeVal} />
					</Labeler>

					<Labeler label="城市">
						<Selecter source={city} bind:selectedVal={cityVal} />
					</Labeler>

				</div>
			</form>
		</CardContent>
		<CardFooter class="gap-3">
			<Button class="w-1/2" on:click={calculate}>
				{#if calculateLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				计算
			</Button>
			<Button variant={"outline"} class="w-1/2" on:click={demoVal}>示例数据</Button>
		</CardFooter>
	</Card>
</div>