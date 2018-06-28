export class DataTransferStore {

    constructor(public scope: string, public data: any = null, public componentCode?: string) {
    }

    /**
     * Get DataTransferStore from event DataTransfer
     * @param jsonData
     */
    public static fromEventDataTransfer(event: any) {
        return (JSON.parse(event.dataTransfer.getData('data')) as DataTransferStore);
    }
}
