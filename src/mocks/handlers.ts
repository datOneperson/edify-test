import { rest } from 'msw'

export const handlers = [
    rest.get('https://api.github.com/organizations', (request, response, ctx) => {
        return response(
            ctx.status(200),
            ctx.json([
                {
                    url: '',
                    avatar_url: '',
                    login: 'testing',
                    description: ''
                }
            ])
        )
    })
]