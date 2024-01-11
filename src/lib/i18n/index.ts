import {browser} from '$app/environment';
import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

const defaultLocale = 'zh-hans'

register('en',() => import('./locales/en.json'))
register('zh-hans',() => import('./locales/zh-hans.json'))
register('zh-hant',() => import('./locales/zh-hant.json'))


init(
	{
		fallbackLocale: defaultLocale,
		initialLocale: browser ? window.navigator.language : defaultLocale,
	}
)