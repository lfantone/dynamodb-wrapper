import {
    addTablePrefixToRequest,
    removeTablePrefixFromResponse
} from './table-prefixes';

describe('lib/table-prefixes', () => {

    describe('addTablePrefixToRequest()', () => {

        it('should insert table prefix for TableName (used in most API methods)', () => {
            let params = {
                TableName: 'MyTable'
            };

            addTablePrefixToRequest('dev-', params);

            expect(params.TableName).toBe('dev-MyTable');
        });

        it('should NOT insert table prefix if TableName already begins with the prefix', () => {
            let params = {
                TableName: 'dev-MyTable'
            };

            addTablePrefixToRequest('dev-', params);

            expect(params.TableName).toBe('dev-MyTable');
            expect(params.TableName).not.toBe('dev-dev-MyTable');
        });

        it('should insert table prefix in RequestItems (used in BatchGetItem, BatchWriteItem)', () => {
            let params: any = {
                RequestItems: {
                    Table1: [],
                    Table2: []
                }
            };

            addTablePrefixToRequest('dev-', params);

            expect(params).toEqual({
                RequestItems: {
                    'dev-Table1': [],
                    'dev-Table2': []
                }
            });
        });

        it('should NOT insert table prefix in RequestItems if the table name already begins with the prefix', () => {
            let params: any = {
                RequestItems: {
                    'dev-Table1': [],
                    'dev-Table2': []
                }
            };

            addTablePrefixToRequest('dev-', params);

            expect(params).toEqual({
                RequestItems: {
                    'dev-Table1': [],
                    'dev-Table2': []
                }
            });

            expect(params).not.toEqual({
                RequestItems: {
                    'dev-dev-Table1': [],
                    'dev-dev-Table2': []
                }
            });
        });

        it('should be a noop if the table prefix is empty string', () => {
            let params = {
                TableName: 'MyTable'
            };

            addTablePrefixToRequest('', params);

            expect(params.TableName).toBe('MyTable');
        });

    });

    describe('removeTablePrefixFromResponse()', () => {

        it('should remove table prefix from Responses (used in BatchGetItem)', () => {
            let response: any = {
                Responses: {
                    'dev-Table1': [],
                    'dev-Table2': []
                }
            };

            removeTablePrefixFromResponse('dev-', response);

            expect(response).toEqual({
                Responses: {
                    'Table1': [],
                    'Table2': []
                }
            });
        });

        it('should remove table prefix from UnprocessedKeys (used in BatchGetItem)', () => {
            let response: any = {
                UnprocessedKeys: {
                    'dev-Table1': {},
                    'dev-Table2': {}
                }
            };

            removeTablePrefixFromResponse('dev-', response);

            expect(response).toEqual({
                UnprocessedKeys: {
                    'Table1': {},
                    'Table2': {}
                }
            });
        });

        it('should remove table prefix from UnprocessedItems (used in BatchWriteItem)', () => {
            let response: any = {
                UnprocessedItems: {
                    'dev-Table1': [],
                    'dev-Table2': []
                }
            };

            removeTablePrefixFromResponse('dev-', response);

            expect(response).toEqual({
                UnprocessedItems: {
                    'Table1': [],
                    'Table2': []
                }
            });
        });

        it('should remove table prefix from ItemCollectionMetrics (used in BatchWriteItem)', () => {
            let response: any = {
                ItemCollectionMetrics: {
                    'dev-Table1': [],
                    'dev-Table2': []
                }
            };

            removeTablePrefixFromResponse('dev-', response);

            expect(response).toEqual({
                ItemCollectionMetrics: {
                    'Table1': [],
                    'Table2': []
                }
            });
        });

        it('should remove table prefix from ConsumedCapacity (used in most API methods)', () => {
            let response = {
                ConsumedCapacity: {
                    TableName: 'dev-MyTable'
                }
            };

            removeTablePrefixFromResponse('dev-', response);

            expect(response).toEqual({
                ConsumedCapacity: {
                    TableName: 'MyTable'
                }
            });
        });

        it('should remove table prefix from ConsumedCapacityMultiple (used in BatchWriteItem)', () => {
            let response = {
                ConsumedCapacity: [
                    {
                        TableName: 'dev-Table1'
                    },
                    {
                        TableName: 'dev-Table2'
                    }
                ]
            };

            removeTablePrefixFromResponse('dev-', response);

            expect(response).toEqual({
                ConsumedCapacity: [
                    {
                        TableName: 'Table1'
                    },
                    {
                        TableName: 'Table2'
                    }
                ]
            });
        });

        it('should be a noop if the table prefix is empty string', () => {
            let response: any = {
                Responses: {
                    Table1: [],
                    Table2: []
                }
            };

            removeTablePrefixFromResponse('', response);

            expect(response).toEqual({
                Responses: {
                    'Table1': [],
                    'Table2': []
                }
            });
        });

    });

});