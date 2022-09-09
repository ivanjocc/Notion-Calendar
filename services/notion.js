const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

// Initializing a client
const notion = new Client({
	auth: process.env.NOTION_TOKEN,
})

const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getVideos () {
	const payLoad = {
		path: `databases/${database_id}/query`,
		method: 'POST'
	}

	const { results } = await notion.request(payLoad)

	const videos = results.map(page => {
		// console.log(page.properties.description.rich_text[0].text.content);

		return{
			id: page.id,
			title: page.properties.Name.title[0].text.content,
			date: page.properties.Date.date.start,
			tags: page.properties.Tags.rich_text[0].text.content,
			description: page.properties.description.rich_text[0].text.content
		}
	})

	return videos
}
