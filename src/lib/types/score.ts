export interface IScore {
	min: number;
	max: number;
	level: string,
	evaluate: string[];
	emoji: string;
}

export const ScoreLevelList: IScore[] = [
	{
		min: -9999,
		max: 0.8,
		level: '没有',
		evaluate: ['这个班再上就不礼貌了', '极具性价比！- 老板','我是自愿上班的'],
		emoji: '😭'
	},
	{
		min: 0.8,
		max: 1.5,
		level: '一般',
		evaluate: ['昨天不是刚上过班吗，怎么今天又要上班','卑职这就去办~','什么班还有我亲自上'],
		emoji: '😐'
	},
	{
		min: 1.5,
		max: 2.0,
		level: '较高',
		evaluate: ['兴趣爱好：上班','爱情不是生活的全部，打工才是'],
		emoji: '😄'
	},
	{
		min: 2.0,
		max: 99999,
		level: '极高',
		evaluate: ['极具性价比！','人生赢家！','相由薪生'],
		emoji: '🤩'
	}
];