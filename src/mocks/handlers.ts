import { http, HttpResponse } from 'msw';

const handlers = [
    //Intercept the "GET /api/prompts" data
    http.get('/api/prompts', () => {
        //create a reponse with JSON using HttpResponse
        return HttpResponse.json({
            data: [{ id: 'id', prompt: 'This is an example prompt', creatorId: '1234', stories: ['testStory'], createdAt: 'exampleDate', deadline: 'exampleDate2', length: 'small' }, { id: 'id', prompt: 'This is an example prompt', creatorId: '1234', stories: ['testStory'], createdAt: 'exampleDate', deadline: 'exampleDate2', length: 'small' }, { id: 'id', prompt: 'This is an example prompt', creatorId: '1234', stories: ['testStory'], createdAt: 'exampleDate', deadline: 'exampleDate2', length: 'small' }],
        });
    }),
];
export default handlers;