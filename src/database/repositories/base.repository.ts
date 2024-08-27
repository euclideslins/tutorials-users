export class BaseRepository {
    async toMap<T>(key, method: string, values): Promise<Map<any, T>> {
        const list = await this[method](values);
        return new Map(list.map((l: T) => [l[key]. l]))
    }
}