import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from "k6/metrics";


const AddCardDuration = new Trend('microservice_collection_add_card_duration');
const AddCardSuccessRate = new Rate('microservice_collection_add_card_success_rate');

const cards = [
  "877b7b90-80d4-4cad-af7c-a0b36c590ca0",
"9a49fb7a-81f5-4d68-ac16-5a7703809db4",
"470ca3f4-29aa-4c4c-8ff2-8cdd70c69943",
"8ef728f1-5153-47d6-8f9c-dfd473ee0750",
"ba05cf47-9823-41f9-b893-321ea89e473e",
"bb54233c-0844-4965-9cde-e8a4ef3e11b8",
"5a9b093d-a483-4c7d-81b5-9c70c866bbb1",
"80716ed1-8d0e-44e6-8b18-606e80d22181",
"988bfa94-0c83-4057-a0c7-0ad885b8919c",
"888cdb76-d365-41df-8b6a-378ac58ca8b2",
"d313d051-7295-4884-8cbf-f2f835fd45f4",
"d631d040-51e9-4540-91e7-aeb5ade84090",
"b6de14ae-0132-4261-af00-630bf15918cd",
"87a4e5fe-161f-42da-9ca2-67c8e8970e94",
"7d4595f2-9297-40dc-b2dd-7144bbb401f7",
"c1d76b74-0d9b-412f-9fd7-af9099bad7c4",
"c8ccbf8d-7f37-4811-bf7b-adc32ed735f3",
"bfdf6824-bc99-40e4-a70b-ed741077a372",
"91b73884-6850-479d-8531-e17c8531a245",
"2bdb402f-b3a9-499c-8b00-31a36c3cba89",
"b4b99ebb-0d54-4fe5-a495-979aaa564aa8",
"eff1f52c-5c43-4260-aaa0-6920846a191c",
"eca9ae7b-a6d9-43ea-92d4-0110fd6643a7",
"63971a64-c5f3-4d1f-ae0d-489d7d5b18f0",
"ce4c6535-afea-4704-b35c-badeb04c4f4c",
"3dbd7f11-01d2-4bb1-9f49-dd72d1afb3e5",
"a4b759f0-901f-4be3-93fa-224609b08d48",
"a457f404-ddf1-40fa-b0f0-23c8598533f4",
"a8e328c6-3a84-49cf-a1a3-1d1e5373d274",
"ff08e5ed-f47b-4d8e-8b8b-41675dccef8b",
"985453e7-997e-4d77-a338-cc0290791ebe",
"03aff125-8962-4a0a-a2b4-e5d693b75400",
"04741224-4974-4828-b005-cfaafaef9b76",
"cad698c3-687e-4b73-88d2-fd0ac7d755c5",
"aeb63464-d06b-4626-a57a-1e393ef04a58",
"0b8aff2c-1f7b-4507-b914-53f8c4706b3d",
"485ab561-9c2a-4f99-9317-8726bcdae364",
"8683a978-1bef-4b01-9361-56b1fc157d26",
"7f4893ef-f983-418b-b7a4-5f073c844545",
"66a82a81-9b3e-421c-b916-15f40f359bf8",
"6d964876-194b-49f1-8e74-cfe9269f2c62",
"f406d477-720b-498c-9f45-1b687e555bcd",
"527cf39d-29d1-4c19-9c49-ebf611ca15d5",
"acd42ebf-6dee-44cc-a023-a7f9b67cfa2f",
"8870ef0b-cb1f-463b-8509-fece4743d3d4",
"f8095ca6-2f5f-497f-8b78-7e530ac31d22",
"d6914dba-0d27-4055-ac34-b3ebf5802221",
"518e4f19-04c4-4829-980b-a2052e9f11b9",
"351e8b1b-4e4e-4ffc-a134-3cf0e2a1dd6d",
"5eaa4199-df9b-494a-af7a-2491e8b0ef70",
"87bb2699-280f-4e1e-b3f8-73efe6088f31",
"a1e048e0-19d2-4076-892d-f8b3104dee37",
"82389aaa-9f32-4169-a71c-1aea5af9e935",
"fa259096-b24f-414c-af59-301bed4b4627",
"1c4a25f0-2929-4404-9ce5-bcd4715f90a5",
"76d7fa2c-4dbc-4e9e-9448-5bf8bbee95d6",
"a0b6a71e-56cb-4d25-8f2b-7a4f1b60900d",
"cc258713-6ce3-44e0-9b4b-8fa7d1d093a1",
"175e21a3-00f7-4c51-8a8e-fbfd7089efda",
"6d69f943-d474-47c0-bc6b-1b247a5dd6f3",
"998d0cc8-ca2a-41c3-ab65-d05c26ab8278",
"ccad6ce0-ddf0-458d-bdae-3d7805fdc775",
"4f08381e-34f5-4d08-b737-8c37964719e0",
"fad4ca85-4d2d-4d1e-86ca-aa25edfcda61",
"4f1579c8-2ec9-49af-bc2e-f4d16a0f1221",
"d6a3672f-c0d3-4504-8886-e50cd30295be",
"77e19416-aa6c-46f1-b247-a94da5d1a13a",
"3435fd09-a7a2-475e-a690-3c2011b70024",
"74943390-d25f-47cb-90bb-cbf70c87f4a2",
"fbe5d85f-bfd3-49e1-a943-ed1ade6bb2a2",
"5790dd89-2be5-4a77-9450-2d3c1422bfc9",
"f857bbe4-5619-4733-a0c7-69700f2ef4f3",
"e5769888-78e0-4d06-b6b6-b4602f7cd462",
"93657aaa-7a0f-49ad-b026-6f79b3bd6768",
"60297593-2438-48d7-9414-48af114a93d2",
"e0fed1e5-fcbd-4597-91b5-ba809571573b",
"a1001d43-e11b-4e5e-acd4-4a50ef89977f",
"d607b003-6b48-429c-a7fd-45b8dd1bb4f9",
"32bbe3c3-d00f-4d53-8738-e4aceb6a01ab",
"dfe08e59-fdc4-436f-b05c-6ad386c46310",
"f26a79b9-9f09-476e-b914-cade929dd852",
"cc6686e6-4535-49be-b0b3-e76464656cd2",
"9685faa0-46cc-4098-9ad7-cffece741baa",
"af915ed2-1f34-43f6-85f5-2430325b720f"
]

const randomNumber = () => Math.floor(Math.random() * 4 + 1)


const mutation = `
  mutation AddCard($data: [AddCardInput!]!) {
    addCard(data: $data) {
      id,
      addedAt,
      quantity,
      updatedAt,
      imageUri
    }
  }

`

export default function addCard(token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'content-type': 'application/json'
  };

  const quantity = randomNumber()


  const data = cards.map(id => ({cardId: id, quantity}))


  const variables = {
    data
  }


  const url = 'http://localhost:4000'

  const body = JSON.stringify({ query: mutation, variables })
  const res = http.post(url, body, {headers})
  const response = JSON.parse(res.body)


  AddCardDuration.add(res.timings.duration);
  AddCardSuccessRate.add(!response.errors);

 

  sleep(1)
}