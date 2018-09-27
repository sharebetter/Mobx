#### 安装依赖：npm install
#### 运行： npm start

### 环境配置主要步骤
#### 项目文件下 新建 src/index.js

#### 执行 npm init -y 初始化项目，创建包含默认内容的package.json文件
#### 创建webpack.config.js文件
#### 安装依赖：
#### cnpm i webpack webpack-cli babel-core babel-preset-env babel-loader -D

#### 进行webpack.config.js配置。
#### package.json文件配置命令：
```javascript
  "scripts": {
    "start": "webpack -w",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

ES6运行环境还需按装插件： cnpm i babel-plugin-transform-class-properties -D
安装@装饰器： cnpm i babel-plugin-transform-decorators-legacy -D 

添加对应的plugins：
```javascript
    module: {
        rules: [{
            test:'/\.(js|jsx)$/',
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                option: {
                    preset: ['env'],
                    plugins: ['transform-decorators-legacy','transform-class-properties']
                }
            }
        }]
    },
```

安装Mobx的依赖：cnpm i mobx -S

编写index.js代码；

npm start运行。