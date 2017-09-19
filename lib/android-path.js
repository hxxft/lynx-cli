var androidProjectPath = './platform/Android'
var androidManifestPath = androidProjectPath + '/app/src/main/AndroidManifest.xml'
var androidlocalPropertiesPath = androidProjectPath + '/local.properties'
var androidStringsValuePath = androidProjectPath + '/app/src/main/res/values/strings.xml'
var androidSrcPath = androidProjectPath + '/app/src/main/java'
var androidAssetPath = androidProjectPath + '/app/src/main/assets'
var androidDrawablePath = androidProjectPath + '/app/src/main/res/drawable'
var androidTemplatePath = androidSrcPath + '/com/template/'
var androidTemplateSrcs = [androidTemplatePath + 'MainActivity.java',
                                    androidTemplatePath + 'MainApplication.java']

module.exports = {
  androidProjectPath,
  androidManifestPath,
  androidlocalPropertiesPath,
  androidStringsValuePath,
  androidSrcPath,
  androidAssetPath,
  androidDrawablePath,
  androidTemplatePath,
  androidTemplateSrcs
}
