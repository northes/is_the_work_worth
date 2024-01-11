export interface IScore {
	min: number;
	max: number;
	level: string,
	meme: string[];
	emoji: string;
}

export const ScoreLevelList: IScore[] = [
	{
		min: -9999,
		max: 0.8,
		level: '惨爆炸',
		meme: [
			'老板：极具性价比！',
			'我是自愿上班的',
			'你看我像是开心的样子吗'
		],
		emoji: '😅'
	},
	{
		min: 0.8,
		max: 0.9,
		level: '很惨',
		meme: [
			'老板：极具性价比！',
			'我是自愿上班的',
			'你看我像是开心的样子吗'
		],
		emoji: '🙁'
	},
	{
		min: 0.9,
		max: 1.2,
		level: '一般',
		meme: [
			'昨天不是刚上过班吗，怎么今天还要上班',
			'卑职这就去办~',
			'到底是什么班还要我亲自上',
			'到底何时才能下班',
			'再撑一下很快可以下班了',
			'咖啡再苦，没上班苦'],
		emoji: '😐'
	},
	{
		min: 1.2,
		max: 1.5,
		level: '很爽',
		meme: [
			'兴趣爱好也可以是：上班',
			'爱情不是生活的全部，打工才是',
		],
		emoji: '😄'
	},
	{
		min: 1.5,
		max: 99999,
		level: '爽爆炸',
		meme: [
			'极具性价比！',
			'人生赢家！',
			'令人羡慕的Job！',
			'我说怎么会有人好看又有钱，原来是相由薪生',
			'简直是神仙工作',
			'您好，咱们公司搬到哪了，怎么忘记通知我了',
		],
		emoji: '🤩'
	}
];