Feature: Test cases for internal employee management service API


    -To perform status validation using Postman***
    Scenario: To validate status code for GET request is 200
        Given   The user has a valid GET endpoint
        When    The user enters the endpoint and the parameter
        And     The user presses the send key
        Then    The data obtained should have a response of 200 (Employee Info)

    -To perform status validation using Postman***
    Scenario: To validate status code for POST request is 201
        Given   The user has a valid POST endpoint
        When    The user enters the post enpoint
        And     The user enters the object property {name: fullname(string)}
        And     The user enters the object property {salary: salary(integer)}
        And     The user eneters the object property {department: department(string)}
        Then    The result obtained should have a reponse code of 201 (Created)

    -To perform response payload verifcation using Postman***
    Scenario: To verify the created data has the correct
	data using a GET request
        Given   The user has performed a POST request
        And     The POST request was successful
        And     The user has a valid GET endpoint
        When    The user enters the Get endpoint and the parameter
        And     The user presses the send key
        Then    The data obtained for the name field should be correct
        And     The data obtained for the salary should be correct
        And     The data obtained for the department should be correct

    -To perform negative test cases***
    Scenario: To validate through POST reqest the minimum length of the fullName property should not be lesser than 2
        Given   The user has a valid POST endpoint
        When    The user enters the post enpoint
        And     The user enters the name property with a length of 1 {name: fullname(string)}
        And     The user enters the salary property {salary: salary(integer)}
        And     The user eneters the department property {department: department(string)}
        Then    The result obtained should have a reponse 400 (bad request)


    -To perform negative test cases***
    Scenario: To validate through POST reqest that the salary data type should not be string
        Given   The user has a valid POST endpoint
        When    The user enters the post enpoint
        And     The user enters the name property with a length of 1 {name: fullname(string)}
        And     The user enters the salary property {salary: salary(string)}
        And     The user eneters the department property {department: department(string)}
        Then    The result obtained should have a reponse 400 (bad request)