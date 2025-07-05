// Not a class, but stores featured community sets location

const communitySets = {
  "Biology": { gcseSets: [], aLevelSets: [] },
  "Chemistry": { gcseSets: [], aLevelSets: [] },
  "Physics": { gcseSets: [], aLevelSets: [] },
  "Psychology": { gcseSets: [], aLevelSets: [] },
  "Economics": { gcseSets: [], aLevelSets: [] },
  "Arithmetic": { gcseSets: [], aLevelSets: [] },
  "Algebra": { gcseSets: [], aLevelSets: [] },
  "Art History": { gcseSets: [], aLevelSets: [] },
  "Geometry": { gcseSets: [], aLevelSets: [] },
  "Calculus": { gcseSets: [], aLevelSets: [] },
  "Statistics": { gcseSets: [], aLevelSets: [] },
  "Accounting": { gcseSets: [], aLevelSets: [] },
  "Ancient History": { gcseSets: [], aLevelSets: [] },
  "Business": { gcseSets: [], aLevelSets: [] },
  "Criminology": { gcseSets: [], aLevelSets: [] },
  "Computer Science": {
    gcseSets: [],
    aLevelSets: []
  },
  "Electronics and Technology": { gcseSets: [], aLevelSets: [] },
  "Geography": { gcseSets: [], aLevelSets: [] },
  "Geology": { gcseSets: [], aLevelSets: [] },
  "Law": { gcseSets: [], aLevelSets: [] },
  "Politics": { gcseSets: [], aLevelSets: [] },
  "Sociology": { gcseSets: [], aLevelSets: [] },
  "Environmental Science and Technology": { gcseSets: [], aLevelSets: [] },
  "English Literature": { gcseSets: [], aLevelSets: [] },
  "Languages": {
    gcseSets: [],
    aLevelSets: []
  },
  "Spanish": {
    gcseSets: [
      {
        title: "Spanish Future Verbs",
        url: "http://dolphinflashcards.com/preview?id=1e44a237-e9d8-5172-9f10-2c9aed03999a&name=Spanish%20Future%20Verbs"
      },
      {
        title: "Spanish Near Future Verbs",
        url: "http://dolphinflashcards.com/preview?id=eae2d589-5161-56be-9695-ae4737b89b14&name=Spanish%20Near%20Future%20Verbs"
      },
      {
        title: "Spanish Present Continuous",
        url: "http://dolphinflashcards.com/preview?id=005cd19c-4d1e-53a9-8762-7be681b38c27&name=Spanish%20Present%20Continuous"
      },
      {
        title: "Spanish Present Indicative",
        url: "http://dolphinflashcards.com/preview?id=26d3c903-add6-5385-bcaf-a36c2a955245&name=SpanishPresentIndicative"
      }
    ],
    aLevelSets: [
      "TODO: Add enough sets to have a seperate A-Level sets category"
    ]
  },
  "French": { gcseSets: [
    {
      title: "French Indefinite Articles",
      url: "http://dolphinflashcards.com/preview?id=4dcc9428-0de9-54ba-ac0e-8830a5655646&name=French%20Indefinite%20Articles"
    },
    {
      title: "French Definite Articles",
      url: "http://dolphinflashcards.com/preview?id=4d9c19cc-82cb-560f-b764-0ad945150cb2&name=French%20Indefinite%20Article"
    },
    {
      title: "French Object And Reflexive Pronouns",
      url: "ttp://dolphinflashcards.com/preview?id=083ef78b-6703-5cb8-980a-ca904861c201&name=French%20Object%20And%20Reflexive%20Pronouns",
    }
  ], aLevelSets: [] },
  "German": { gcseSets: [], aLevelSets: [] },
  "Latin": { gcseSets: [], aLevelSets: [] },
  "Japanese": { gcseSets: [], aLevelSets: [] },
  "Italian": { gcseSets: [], aLevelSets: [] },
  "Chinese": { gcseSets: [], aLevelSets: [] },
  "Arabic": { gcseSets: [], aLevelSets: [] },
  "Hindi": { gcseSets: [], aLevelSets: [] },
  "Greek": { gcseSets: [], aLevelSets: [] },
  "Russian": { gcseSets: [], aLevelSets: [] },
  "Hebrew": {
    gcseSets: [
      {
        title: "Biblical Hebrew Noun Endings (Suffixes)",
        url: "http://dolphinflashcards.com/preview?id=ed90257b-d180-51e0-b8a5-3af2c7bc092b&name=Biblical%20Hebrew%20Noun%20Endings%20(Suffixes)"
      },
      {
        title: "Biblical Hebrew Noun Possession",
        url: "http://dolphinflashcards.com/preview?id=429c166d-e4fe-5b3a-8542-c5f7fea2fbe8&name=Biblical%20Hebrew%20Noun%20Posession"
      },
      {
        title: "Biblical Hebrew Pronouns",
        url: "http://dolphinflashcards.com/preview?id=fcc56a94-5e60-56cc-86c9-bae1e4f94fc0&name=Biblical%20Hebrew%20Pronouns"
      },
      {
        title: "Biblical Hebrew Qal Imperative Strong",
        url: "http://dolphinflashcards.com/preview?id=561be20b-7220-5496-ad78-d2ffa3b82281&name=Biblical%20Hebrew%20Qal%20Imperative%20Strong"
      },
      {
        title: "Biblical Hebrew Qal Imperfect Strong",
        url: "http://dolphinflashcards.com/preview?id=ab3975da-6217-5ea0-b7c5-7991a95b422f&name=Biblical%20Hebrew%20Qal%20Imperfect%20Strong"
      },
      {
        title: "Biblical Hebrew Qal Perfect Strong",
        url: "http://dolphinflashcards.com/preview?id=ef2eecbe-a63e-5db3-aace-7c26a4a3b6ea&name=Biblical%20Hebrew%20Qal%20Perfect%20Strong"
      },
      {
        title: "Biblical Hebrew Most Common Words (21)",
        url: "http://dolphinflashcards.com/preview?id=c5e08817-8c43-53c6-b69c-e6e2cee38107&name=Biblical%20Hebrew%20Most%20Common%20Words%20(21)"
      },
      {
        title: "Biblical Hebrew Most Common Words (22)",
        url: "http://dolphinflashcards.com/preview?id=bc192113-8f8e-5262-9629-392bbccbd5dd&name=Biblical%20Hebrew%20Most%20Common%20Words%20(22)"
      },
      {
        title: "Biblical Hebrew Most Common Words (23)",
        url: "http://dolphinflashcards.com/preview?id=df25d080-2eae-5b26-a779-d346322ffb92&name=Biblical%20Hebrew%20Most%20Common%20Words%20(23)"
      }
    ],
    aLevelSets: [
      "TODO: Add enough sets to have a seperate A-Level sets category"
    ]
  }
};

export default communitySets