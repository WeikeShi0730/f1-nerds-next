const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:5000' : 'https://https://f1-nerds-flask.herokuapp.com/'

export const years = [2018, 2019, 2020, 2021];