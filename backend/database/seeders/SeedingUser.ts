import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Faker from 'faker'
import User from 'App/Models/User'
import { getRandomInt } from 'App/Helper/Math'

export default class SeedingUserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const list: any = Array(100).fill(0).map((item) => ({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      age: getRandomInt(20 ,30),
      picture: `${Faker.image.people(288, 400)}?random=${Math.round(Math.random() * 100000)}`
    }))
    await User.createMany(list)
  }
}
