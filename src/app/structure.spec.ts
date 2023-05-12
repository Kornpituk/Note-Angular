function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}

type ExpectClassParams = {
  module: any
  classPath: string
  className: string
  classMethods?: Record<string, number>
}

export function expectClass({ module, classPath, className, classMethods } : ExpectClassParams){
  const theClass = module[className]
  expect(isClass(theClass)).withContext(`class ${className} should be located in "${classPath}" file. You have probably renamed or removed the file, but the task tests will depend on the original filename, once your solution will gets eventually evaluated.`).toEqual(true)

   // only public API is checked, methods checked for length (number of function parameters)
  if (classMethods){
    for (const [methodName, methodLength] of Object.entries(classMethods)){
      expect(typeof theClass.prototype[methodName]).withContext(`${className} class located in "${classPath}" file should have a "${methodName}" method defined. You have probably renamed or removed the method, but the task tests depend on the original public API of this class, once your solution will gets eventually evaluated.`).toEqual("function")

      expect(theClass.prototype[methodName].length).withContext(`${className} class located in "${classPath}" file should have a "${methodName}" method with length ${methodLength} (number of function parameters). You have probably changed the parameters of the public method, but the task tests depend on the original public API of this class, once your solution will gets eventually evaluated.`).toEqual(methodLength)
    }
  }
}

describe('[STRUCTURE TEST]', () => {
  it('should include required files, classes and methods with the expected names', async () => {
    expectClass({
      module: await import('./notes.service'),
      classPath: `./${atob("bm90ZXMuc2VydmljZS50cw==")}`, // notes.service.ts
      className: atob("Tm90ZXNTZXJ2aWNl"), // NotesService
      classMethods: {
        getNotes: 0,
        getNote: 1,
        saveNote: 1,
      },
    })

    expectClass({
      module: await import('./app.component'),
      classPath: `./${atob("YXBwLmNvbXBvbmVudC50cw==")}`, // app.component.ts
      className: atob("QXBwQ29tcG9uZW50"), // AppComponent
      classMethods: {
        selectNote: 1,
        newNote: 0,
        saveNote: 1,
      }
    })

  });
});
