cp ./src/index.html ./build/
cp ./src/*.txt ./build/
cp ./src/style.css ./build/
cp ./src/img/* ./build/
cp ./src/ts/lib/* ./build/js/lib
tsc

cd ./build
zip -r ../build.zip *