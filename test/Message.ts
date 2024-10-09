import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import TodoListModule from "../ignition/modules/Todolist";

describe('TodoList Test', function () {
    async function deploymentTodoListFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const TodoList = await hre.ethers.getContractFactory('TodoList');
        const todoList = await TodoList.deploy();

        return { todoList, owner, otherAccount }
    }

    describe('deployment', () => {
        it('Should check if it deployed', async function () {
            const { todoList, owner } = await loadFixture(deploymentTodoListFixture);

            expect(await todoList.owner()).to.equal(owner);
        })

        it('should be able to create list as the owner', async function () {
            const { todoList, owner } = await loadFixture(deploymentTodoListFixture);
            const title = 'Coding Time';
            const description = 'midnight everyday';
            await todoList.connect(owner).createTodo(title, description);

        })

        it('should be able to get single list ', async function () {
            const { todoList, owner } = await loadFixture(deploymentTodoListFixture);

            const index = 0;
            await todoList.connect(owner).createTodo('Coding Time', 'midnight everyday');

            const [listTitle, listDescription, listStatus] = await todoList.getTodo(index)

            expect(listTitle).to.equal("Coding Time")
            expect(listDescription).to.equal("midnight everyday")
            expect(listStatus).to.equal(1)

        })

        it('should be able to update  list ', async function () {
            const { todoList, owner } = await loadFixture(deploymentTodoListFixture);

            await todoList.connect(owner).createTodo('Coding Time', 'midnight everyday');

            const i = 0;

            await todoList.connect(owner).updateTodo(i, "First Commit", "Hello World")

            const [itemOne, itemTwo, itemThree] = await todoList.getTodo(i)

            expect(itemOne).to.equal("First Commit")
            expect(itemTwo).to.equal("Hello World")
            expect(itemThree).to.equal(2)


        })

        it('should be able to get all list', async function () {
            const { todoList, owner } = await loadFixture(deploymentTodoListFixture);

            await todoList.connect(owner).getAllTodo()
        }) 

        it ('should be able to show complete ', async function () {
            const { todoList, owner } = await loadFixture(deploymentTodoListFixture);

            const title = 'reading'
            const description = 'everyday'

            await todoList

            
        })
    })
})
