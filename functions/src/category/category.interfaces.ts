

/**
 * @param id is the key of documenation and must folllow the standard limitation at https://firebase.google.com/docs/firestore/quotas#limits
 */
export interface CategoryData {
    id: string;
    title?: string;
    description?: string;
    createdAt?: number;
    updatedAt?: number;
}

export interface CategoryDatas {
    [id: string]: CategoryData;
}

