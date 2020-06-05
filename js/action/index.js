import { onThemeChange } from "./theme"
import { onRefreshPopular ,onLoadMorePopular} from "./popular"
import { onRefreshTrending ,onLoadMoreTrending} from "./trending"

// 这里是用来合并所有action(备注：我是小明同学对象！)
export default {
    onThemeChange,
    onRefreshPopular,
    onLoadMorePopular,
    onRefreshTrending,
    onLoadMoreTrending
}