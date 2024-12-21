## GITHUB Action 

增加 secrects.github_token

需要打开 read and write permission 否则也是无法运行的

## betweer sqlite3 容易出现依赖问题 
使用 libsql 进行替换 但是对应的所有的sql async function都需要修改的


## linux 下vue 大小写问题 导致github runner 失败
注意原来文件如果提交到git大小写就会被记录,需要重新新建一个不一样文件的文件才行 ,直接重命名是没有效果的
