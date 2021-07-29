export default class ChapmionModel {
    id: string;
    key: string;
    name: string;
    position: string[];

    constructor({id, key, name, position = []}: ChapmionModel) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.position = position;
    }
}