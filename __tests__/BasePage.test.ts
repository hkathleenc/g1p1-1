
test('SmartLink login', async () => {
    await (await driver).get('https://smartlink.secure.direct/7.95/html/login.php')
    const userName: By = By.css('#username')
    const passWord: By = By.css('#password')
    const logIn: By = By.css('#submit')
   await (await driver).findElement(userName).sendKeys('hw120120')
   await (await driver).findElement(passWord). sendKeys('123456')
   })