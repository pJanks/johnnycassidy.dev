// ! CLICK PROFILE NOTES

// ! calculating walls:

// * width is constant

// * total 19 ft walls = height / 19 rounded down

// * partial wall = height - (total 19 ft walls x 19)

// * if (partial wall is equal to 0) do nothing

// * if (partial wall is less than OR equal to 9) one wall: height = partial wall

// * if (partial wall is greater than 9 AND less than 16)
  // * two walls:
    // * wall a: height = 9,
    // * wall b: height = partial wall - wall a height

// * if (partial wall is greater than OR equal to 16) height = 19

// ! calculating profiles per wall:
// * convert width to inches: width x 12
// * divide result by (profileUnitWidth + 0.4 rounded up)
// * divide result by (19 / height rounded down) rounded up???

// ! PROFILE TESTS 
/**
 * ! one wall variations tests
 * -------------------------------------------------------------------------------------------
 * 
 * width in inches / (width of profile rounded up) / (19 / height rounded down)
 * height: 7 width: 10
 * one wall because height < 9
 * 
 * 120 / 2 / (19 / 7 rounded down)
 * 60 / 2
 * 30
 * 
 * -------------------------------------------------------------------------------------------
 * 
 * width in inches / (width of profile rounded up) / (19 / height rounded down)
 * height: 17 width: 10
 * one wall with height rounded up to 19 because height > 16 but height < 19
 * 
 * 120 / 2 / (19 / 19 rounded down)
 * 60 / 1
 * 60
 * 
 * -------------------------------------------------------------------------------------------
 * 
 * width in inches / (width of profile rounded up) / (19 / height rounded down)
 * height: 19 width: 10
 * one wall because height is not more than 19
 * 
 * 120 / 2 / (19 / 19 rounded down)
 * 60 / 1
 * 60
 * 
 * -------------------------------------------------------------------------------------------
 * 
 * ! multiple wall variations tests
 * width in inches / (width of profile rounded up) / (19 / height rounded down)
 * height: 13 width: 10
 * split into two walls because height > 9 and height < 16
 * 
 * wall a
 * height: 9 width: 10
 * 
 * 120 / 2 / (19 / 9 rounded down)
 * 60 / 2
 * 30
 * 
 * wall b
 * height: 4 width: 10
 * 
 * 120 / 2 / (19 / 4 rounded down)
 * 60 / 4
 * 15
 * 
 * total profiles = wall a + wall b
 * 30 + 3
 * 45
 * 
 * -------------------------------------------------------------------------------------------
 * 
 * width in inches / (width of profile rounded up) / (19 / height rounded down)
 * height: 40 width: 10
 * split into three walls because height > 19 and (height / 19 rounded down) is 2
 * these represent 2 full 19 foot walls
 * 
 * two full walls: height: 19 width: 10
 * 120 / 2 / (19 / 19 rounded down)
 * 60 / 1
 * 60 per wall * 2
 * 120
 * 
 * remaining wall: height: 2 width: 10
 * 120 / 2 / (19 / 2 rounded down)
 * 60 / 9
 * 7
 * 
 * total profiles = total for 19 ft walls + total for remaining // ! rounded up????
 * 120 + 7
 * 127
 * 
 * -------------------------------------------------------------------------------------------
 * ! pdf profiles example test case expected results:
 * height: 13 x width: 12 total wall should be for:
 * 54 profiles
 * 5 rails (i am not getting this from my calcultions)
 * 
 * ! pdf profiles example test case:
 * width in inches / (width of profile rounded up) / (19 / height rounded down)
 * height: 13 width: 12
 * split into two walls because height > 9 and height < 16
 * 
 * wall a
 * height: 9 width: 12
 * 
 * 144 / 2 / (19 / 9 rounded down)
 * 72 / 2
 * 36
 * 
 * wall b
 * height: 4 width: 12
 * 
 * 144 / 2 / (19 / 4 rounded down)
 * 72 / 4
 * 18
 * 
 * total profiles = wall a + wall b
 * 36 + 18
 * 54
 * 
 * -------------------------------------------------------------------------------------------
 */

// ! switching width and height, calculate total walls with same rules applied to profiles

// ! calculating rails per wall:
// * x = height of wall / 3 rounded up
// * y = 19 / width of wall rounded down
// * rails = x / y rounded up

// ! RAILS TESTS
/**
 * ! one wall variations tests
 * -------------------------------------------------------------------------------------------
 * 
 * (height / 3 for spacing rounded up) / (19 / width rounded down) rounded up
 * height: 10 width: 7
 * one wall because width < 9
 * 
 * (10 / 3 rounded up) / (19 / 7 rounded down) rounded up
 * 4 / 2 rounded up
 * 2
 * 
 * -------------------------------------------------------------------------------------------
 * 
 * (height / 3 for spacing rounded up) / (19 / width rounded down) rounded up
 * height: 10 width: 17
 * one wall with width rounded up to 19 because width > 16 but width < 19
 * 
 * (10 / 3 rounded up) / (19 / 19 rounded down) rounded up
 * 4 / 1 rounded up
 * 4
 * 
 * -------------------------------------------------------------------------------------------
 * 
 * (height / 3 for spacing rounded up) / (19 / width rounded down) rounded up
 * height: 10 width: 19
 * one wall because width is not more than 19
 * 
 * (10 / 3 rounded up) / (19 / 10 rounded down) rounded up
 * 4 / 1 rounded up
 * 4
 * 
 * -------------------------------------------------------------------------------------------
 * ! multiple wall variations tests
 * (height / 3 for spacing rounded up) / (19 / width rounded down) rounded up
 * height: 10 width: 13
 * split into two walls because width > 9 and width < 16
 * 
 * wall a
 * height: 10 width: 9
 * 
 * (10 / 3 rounded up) / (19 / 9 rounded down)
 * 4 / 2 rounded up
 * 2
 * 
 * wall b
 * height: 10 width: 4
 * 
 * (10 / 3 rounded up) / (19 / 4 rounded down)
 * 4 / 4 rounded up
 * 1
 * 
 * total rails = wall a + wall b
 * 2 + 1
 * 3
 * 
 * -------------------------------------------------------------------------------------------
 * 
 * (height / 3 for spacing rounded up) / (19 / width rounded down) rounded up
 * height: 10 width: 40
 * split into three walls because width > 19 and (width / 19 rounded down) is 2
 * these represent 2 full 19 foot walls
 * 
 * two full walls: height: 10 width: 19
 * 
 * (10 / 3 rounded up) / (19 / 19 rounded down)
 * 4 / 1 rounded up
 * 4 per wall * 2
 * 8
 * 
 * remaining wall: height: 10 width: 2
 * 
 * (10 / 3 rounded up) / (19 / 2 rounded down)
 * 4 / 9 rounded up
 * 1
 * 
 * total rails = full wall rails + partial wall rails
 * 8 + 1
 * 9
 * 
 * -------------------------------------------------------------------------------------------
 * ! pdf rails example test case expected results:
 * height: 13 x width: 12 total wall should call for:
 * 5 rails // ! (i am not getting this from my calcultions)
 * 
 * ! pdf rails example test case:
 * (height / 3 for spacing rounded up) / (19 / width rounded down) rounded up
 * height: 13 width: 12
 * split into two walls because width > 9 and width < 16
 * 
 * wall a
 * height: 13 width: 9
 * 
 * (13 / 3 rounded up) / (19 / 9 rounded down)
 * 5 / 2 rounded up
 * 3
 * 
 * wall b
 * height: 13 width: 3
 * 
 * (13 / 3 rounded up) / (19 / 3 rounded down)
 * 5 / 6 rounded up
 * 1
 * 
 * total rails = wall a + wall b
 * 3 + 1
 * 4 // ! 5 in provided pdf example
 */



/**
 * 
 * Create another Calculator
 * 
 * unit must be 19 ft regardless of wall size
 * if wall is 11 ft x 10 ft, for example, 19 ft units will be used for the width of the wall
 * 
 * calculate what the linear and square footage are of the waste from the order
 * 
 * 3 to 4 weeks for desktop application
 * 4 to 5 weeks for mobile application
 * 
 */

/**
 * 
 * 
 * multiple walls
 * 
 * 
 * if height of waste from wall 1 is <= height of wall 2
 * then reduce the height of waste from wall 2 profiles
 * 
 * if height of waste from wall 1 is > 9 ft
 * 
 * bascially need to optimize for 
 * 
 */


/**
 * 30/30 angles for click profiles
 * 
 * angle L for universal
 * 
 * 
 * * PRIORITIES
 * * *
 * replace current jotforms // ! DONE ?
 * 
 * create new jotform for 19 ft unit increments only // ! DONE ?
 * 
 * create a calculator for the new form as well as calculators for all other sidings
 * 
 * optimize for multiple walls and space used to get minimal necessary units
 * 
 * add MUST SEND TO ENGINEERING BEFORE QUOTING to new jotforms if there is more than one wall
 * 
 * 
 * 
 * * RESET DEFAULTS:
 * HOW MANY WALLS
 * U10 PROFILES
 * WIDTH
 * HEIGHT
 * ALIGNMENT
 * TYPE
 * SHADE
 * 
 * * ADD REQUIRED BACK TO FORM: 
 * NAME
 * EMAIL
 * ZIP CODE
 * HOW DID YOU HEAR ABOUT US
 * PLEAE ELABORATE
 * 
 * ! ADD ELEMENT BACK:
 * HOW DID YOU HEAR ABOUT US
 * PLEASE ELABORATE
 * CAPTCHA
 * DATE
 * 
 */


