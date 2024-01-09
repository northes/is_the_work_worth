<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import type { ISelectItem } from '$lib/types/selectItem';
	import Selecter from '$lib/components/selecter';
	import { ColorWheel } from 'radix-icons-svelte';
	import { confetti } from '@neoconfetti/svelte';
	import { ScoreLevelList } from '$lib/types/score';
	import { titleEmoji } from '$lib/stores/stores';

	// 月薪
	let monthlySalary: number;
	// 公积金
	let accumulationFund: number;
	// 工作天数
	let workingDays: number;
	// 平均日薪（只读）
	$: averageDailySalary = Number(((Number(monthlySalary) + Number(accumulationFund)) / Number(workingDays)).toFixed(2));
	// 工作时长
	let workingHours: number;
	// 通勤时长
	let commutingTime: number;
	// 摸鱼时长
	let fishingTime: number;
	// 午休时长
	let lunchTime: number;
	// 平均时薪
	$: averageHourSalary = Number((Number(averageDailySalary) / (workingHours - fishingTime - lunchTime)).toFixed(2));


	// 学历
	const degrees: ISelectItem[] = [
		{
			value: 0.8,
			label: '专科及以下'
		},
		{
			value: 1.0,
			label: '普通本科'
		},
		{
			value: 1.2,
			label: '211/985本科'
		},
		{
			value: 1.4,
			label: '普通硕士'
		},
		{
			value: 1.6,
			label: '211/985硕士'
		},
		{
			value: 1.8,
			label: '普通博士'
		},
		{
			value: 2.0,
			label: '211/985博士'
		}
	];
	let degreeVal: ISelectItem;
	// 工作环境
	const workingEnv: ISelectItem[] = [
		{
			value: 0.8,
			label: '偏僻地区'
		},
		{
			value: 0.9,
			label: '工厂户外'
		},
		{
			value: 1.0,
			label: '普通'
		},
		{
			value: 1.1,
			label: '体制内'
		}
	];
	let workingEnvVal: ISelectItem;
	// 异性环境
	const oppositeSexEnv: ISelectItem[] = [
		{
			value: 0.9,
			label: '没有'
		},
		{
			value: 1.0,
			label: '不多不少'
		},
		{
			value: 1.1,
			label: '很多'
		}
	];
	let oppositeSexEnvVal: ISelectItem;
	// 同事环境
	const colleagueEnv: ISelectItem[] = [
		{
			value: 0.95,
			label: 'SB很多'
		},
		{
			value: 1.0,
			label: '普通很多'
		},
		{
			value: 1.05,
			label: '优秀很多'
		}
	];
	let colleagueEnvVal: ISelectItem;
	// 职业资格
	const occupationalQualification: ISelectItem[] = [
		{
			value: 1.00,
			label: '无要求、二级'
		},
		{
			value: 1.05,
			label: '建造造价监理'
		},
		{
			value: 1.10,
			label: '建筑岩土结构'
		},
		{
			value: 1.15,
			label: '主任医师、教授'
		}
	];
	let occupationalQualificationVal: ISelectItem;
	// 是否8:30前上班
	const workBefore830: ISelectItem[] = [
		{
			value: 0.95,
			label: '是'
		}, {
			value: 1.00,
			label: '否'
		}
	];
	let workBefore830Val: ISelectItem;

	// 环境系数
	let envComprehensiveCoefficient: number;

	// 最终计算得出的工作性价比
	let finalScore: number;
	let finalScoreLevel: string;
	let finalScoreEvaluate: string;
	let calculateLoading: boolean = false;

	function calculate() {
		finalScore = 0;
		calculateLoading = true;
		setTimeout(() => {
			calculateLoading = false;
			// 环境综合系数
			envComprehensiveCoefficient = workingEnvVal.value *
				oppositeSexEnvVal.value *
				colleagueEnvVal.value *
				occupationalQualificationVal.value;

			let final = (averageDailySalary * envComprehensiveCoefficient) / (35 * (Number(workingHours) + Number(commutingTime) - 0.5 * (Number(fishingTime) + Number(lunchTime))) * degreeVal.value);
			final = final * workBefore830Val.value;
			// console.log(final);
			finalScore = Number(final.toFixed(2));
			console.log(finalScore);
			// 生成描述
			ScoreLevelList.forEach((v, i) => {
				if (finalScore >= v.min && finalScore < v.max) {
					let idx = Math.floor((Math.random() * v.evaluate.length));
					finalScoreEvaluate = v.evaluate[idx];
					finalScoreLevel = v.level;
					titleEmoji.set(v.emoji);
				}
			});
			// 返回顶部
			document.body.scrollTop = document.documentElement.scrollTop = 0;

		}, 100);
	}

	// 填充示例数据
	function demoVal() {
		monthlySalary = 8000;
		accumulationFund = 100;
		workingDays = 25;
		workingHours = 8;
		commutingTime = 1;
		fishingTime = 1.5;
		lunchTime = 1.5;
		degreeVal = degrees[1];
		workingEnvVal = workingEnv[2];
		oppositeSexEnvVal = oppositeSexEnv[0];
		colleagueEnvVal = colleagueEnv[1];
		occupationalQualificationVal = occupationalQualification[0];
		workBefore830Val = workBefore830[1];
		finalScore = 0;
	}
</script>

<div>
	{#if finalScore > 0}
		<div class="flex justify-center">
			<div use:confetti={{
				stageHeight: 800,
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
				<p>日薪：{averageDailySalary}</p>
				<p>时薪：{averageHourSalary}</p>
				<p>环境系数：{envComprehensiveCoefficient}</p>
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
					<div class="flex flex-col space-y-1.5">
						<Label>月薪</Label>
						<Input bind:value={monthlySalary} placeholder="每个月的固定工资" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>公积金</Label>
						<Input bind:value={accumulationFund} placeholder="自己每个月交多少钱" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>工作天数</Label>
						<Input bind:value={workingDays} placeholder="每个月工作天数" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>平均日薪</Label>
						<Input disabled value={averageDailySalary >= 0 ? averageDailySalary : 0} placeholder="" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>工作时长</Label>
						<Input bind:value={workingHours} placeholder="下班时间-上班时间" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>通勤时长</Label>
						<Input bind:value={commutingTime} placeholder="小时" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>摸鱼时长</Label>
						<Input bind:value={fishingTime} placeholder="不干活的时间" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>午休时长</Label>
						<Input bind:value={lunchTime} placeholder="中午吃饭+午休" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>平均时薪</Label>
						<Input disabled value={averageHourSalary >= 0 ? averageHourSalary : 0} placeholder="" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>环境系数</Label>
						<Input disabled value={envComprehensiveCoefficient >= 0 ? envComprehensiveCoefficient : 0} placeholder="" />
					</div>

					<div>
						<Selecter label="学历" source={degrees} bind:selected={degreeVal} />
					</div>
					<div>
						<Selecter label="工作环境" source={workingEnv} bind:selected={workingEnvVal} />
					</div>
					<div>
						<Selecter label="异性环境" source={oppositeSexEnv} bind:selected={oppositeSexEnvVal} />
					</div>
					<div>
						<Selecter label="同事环境" source={colleagueEnv} bind:selected={colleagueEnvVal} />
					</div>
					<div>
						<Selecter label="职业资格" source={occupationalQualification}
											bind:selected={occupationalQualificationVal} />
					</div>
					<div>
						<Selecter label="8:30前上班" source={workBefore830} bind:selected={workBefore830Val} />
					</div>
				</div>
			</form>
		</CardContent>
		<CardFooter class="gap-3">
			<Button class="w-1/2" on:click={calculate}>
				{#if calculateLoading}
					<ColorWheel class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Calculate

			</Button>
			<Button variant={"outline"} class="w-1/2" on:click={demoVal}>demo</Button>
		</CardFooter>
	</Card>
</div>