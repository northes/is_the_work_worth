<script lang="ts">
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '$lib/components/ui/accordion';
	import MathMl from 'svelte-tex/package/MathML.svelte';

	const tex = String.raw`工作性价比 = \sqrt{\frac{平均日薪系数\times 综合环境系数\times 综合作息系数}{25\times \left ( 工作时长+  0.5 \times 通勤时长- 0.5\times 摸鱼时长 \right )\times 学历系数\times 城市系数 } } `;
</script>

<div>
	<Accordion class="w-full">
		<AccordionItem value="item-1">
			<AccordionTrigger>计算公式</AccordionTrigger>
			<AccordionContent>
				<div class="space-y-6">
					<div>
						感谢：知乎用户
						<a class="font-medium text-primary underline underline-offset-4" target="_blank"
							 href="https://www.zhihu.com/people/la-la-pai-pi-qiu">
							@天线宝宝烤面包
						</a>
						的
						<a class="font-medium text-primary underline underline-offset-4" target="_blank"
							 href="https://www.zhihu.com/pin/1462200737735958528">
							计算公式
						</a>
					</div>
					<div>
						<MathMl {tex} />
					</div>
					<div>

					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-2">
			<AccordionTrigger>准确性如何</AccordionTrigger>
			<AccordionContent>
				仅供娱乐。很多东西没办法用数字衡量，很多变量也没考虑在内（福利，成长性，稳定性，工作压力，人际关系等）
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-3">
			<AccordionTrigger>哪些是新一线城市</AccordionTrigger>
			<AccordionContent>
				根据2023公布的最新数据：成都、重庆、杭州、武汉、苏州、西安、南京、长沙、天津、郑州、东莞、青岛、昆明、宁波、合肥
			</AccordionContent>
		</AccordionItem>
	</Accordion>
</div>
