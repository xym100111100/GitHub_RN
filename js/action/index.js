import { onThemeChange } from "./theme"
import { onLoadPopularData ,onLoadMorePopular} from "./popular"
import { onLoadTrendingData ,onLoadMoreTrending} from "./trending"

// 这里是用来合并所有action(备注：我是小明同学对象！)
export default {
    onThemeChange,
    onLoadPopularData,
    onLoadMorePopular,
    onLoadTrendingData,
    onLoadMoreTrending
}