public with sharing class lightningInputLookup {
    public lightningInputLookup() {

    }

    @AuraEnabled(cacheable=true)
    public static list<sObject> getRecords(String searchTerm , String sObjectApiName){

        list<sObject> returnList= new list<sObject>();
        try {
            String sWildCardText= '%'+searchTerm+'%';
            String query= 'Select Id,Name from '+sObjectApiName+' WHERE Name LIKE : sWildCardText ORDER BY NAME ASC LIMIT 50';
            for(sObject obj :Database.query(query)){
                returnList.add(obj);
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return returnList;
    }
}
