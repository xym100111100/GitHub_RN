import {FLAG_STORAGE} from '../expand/dao/DataStore';

export default class FavoriteUtil {

    /**
     * favoriteIcon单击回调函数
     * @param favoriteDao
     * @param item
     * @param isFavorite
     * @param flag
     */
    static onFavorite(favoriteDao, item, isFavorite, flag) {
         const key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id.toString(); // 使用这种方式无法收藏，刷新后就没有了
        //const key =  item.id.toString();  
        // console.log(key)
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            favoriteDao.removeFavoriteItem(key);
        }
    }
}
