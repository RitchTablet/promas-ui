import Dexie, { Table } from 'dexie';
import { PostTable } from './tables-interfaces/post.table';

class DbMain extends Dexie {
    posts!: Table<PostTable>;

    constructor(private readonly _dbName:string) {
        super(_dbName);
        this.version(1).stores({
            posts: 'id, title, username, imgBannerUrl, profileImageUrl, createdAt'
        });
    }
}

export const dbMain = new DbMain('dbMain');