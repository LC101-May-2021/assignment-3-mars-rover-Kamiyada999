const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts" , function() {
    
    let rover = new Rover(9999);
    expect (rover.position).toEqual(9999);
    expect(rover.mode).toEqual("NORMAL");
    expect (rover.generatorWatts).toEqual(110);
    

  })

  it("response returned by receiveMessage contains name of message" , function() {

    let rover = new Rover(9999);
    let commands = [new Command("MODE_CHANGE"), new Command("STATUS_CHECK")];
    let message = new Message("test", commands);
    let response = rover.receiveMessage(message).message;
    expect(message.name). toEqual("test");
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message" , function() {
    
    let rover = new Rover(9999);
    let message = new Message("test2" , [new Command("MODE_CHANGE" , "MOVE"), new Command("STATUS_CHECK")]);
    let response = rover.receiveMessage(message).message;
    expect(response.results.length).toEqual(2);

  })

  it("responds correctly to status check command" , function() {

    let rover = new Rover(9999);
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("testcheck", commands);
    let response = rover.receiveMessage(message);
    expect (rover.position).toEqual(9999);
    expect(rover.mode).toEqual("NORMAL");
    expect (rover.generatorWatts).toEqual(110);
    
    })

  it("responds correctly to mode change command" , function() {
    
    let rover = new Rover(9999);
    let commands = [new Command("MODE_CHANGE" , "LOW_POWER") , new Command("STATUS_CHECK")];
    let message = new Message("testlow", commands);
    let response = rover.receiveMessage(message);
    expect (rover.position).toEqual(9999);
    expect(rover.mode).toEqual("LOW_POWER");
    expect (rover.generatorWatts).toEqual(110);
  })
  
  it("responds with false completed value when attempting to move in LOW_POWER mode" , function() {

    let rover = new Rover(9999);
    let commands = [new Command("MOVE", 9090) , new Command("MODE_CHANGE" , "LOW_POWER")];
    let message = new Message("testnomove", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
  })

  it("responds with position for move command" , function() {

    let rover = new Rover(9999);
      let commands = [new Command("MOVE", 9090)];
      let message = new Message("testmove", commands);
      let response = rover.receiveMessage(message);
      expect(response.results[1].completed).toEqual(true);
      expect (rover.position).toEqual(9090);
  })
});
