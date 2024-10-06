import { http, HttpResponse } from 'msw';

const handlers = [
  //Intercept the "GET /api/prompts" data
  http.get('/api/prompts', () => {
    //create a reponse with JSON using HttpResponse
    return HttpResponse.json({
      data: [
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
      ],
    }); //add some examples with a story
  }),
  //Intercept the "GET /api/prompts/{id}" data to get a single prompt
  http.get('api/prompts/*', () => {
    return HttpResponse.json({
      data: {
        id: 'id',
        promptTitle: 'This is an example prompt',
        creatorId: '1234',
        stories: [
          {
            id: 'storyId',
            promptId: 'promptId',
            story: 'This is an example of a story for a given prompt',
            creatorId: '1234',
            createdAt: new Date(),
            views: 0,
            rating: 0,
          },
        ],
        createdAt: 'exampleDate',
        deadline: 'exampleDate2',
        length: 'small',
      },
    });
  }),
  //Intercept the "POST /api/prompts" data to create a new prompt
  http.post('api/prompts', () => {
    return HttpResponse.json({
      data: [
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
      ],
    });
  }),
  //Intercept the "GET /api/prompts/{id}" data to get all prompts by creatorID
  http.get('api/prompts/{creatorId}', () => {
    return HttpResponse.json({
      data: [
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
      ],
    });
  }),
  //Intercept the "PUT /api/prompts/{id}" data to update a single prompt by id
  http.put('api/prompts/{id}', () => {
    return HttpResponse.json({
      data: [
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
      ],
    });
  }),
  //Intercept the "PUT /api/prompts/{id}" data to delete a single prompt by id
  http.delete('api/prompts/{id}', () => {
    return HttpResponse.json({
      data: [
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
        {
          id: 'id',
          promptTitle: 'This is an example prompt',
          creatorId: '1234',
          stories: [
            {
              id: 'storyId',
              promptId: 'promptId',
              story: 'This is an example of a story for a given prompt',
              creatorId: '1234',
              createdAt: new Date(),
              views: 0,
              rating: 0,
            },
          ],
          createdAt: 'exampleDate',
          deadline: 'exampleDate2',
          length: 'small',
        },
      ],
    });
  }),
];
export default handlers;
