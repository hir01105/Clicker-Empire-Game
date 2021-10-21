# Clicker Empire Game
## Description
**Clicker Empire Game**は[Recursion](https://recursionist.io/) project3の課題です。  
クリックとアイテムの購入によって資産を増やしていく簡単なゲームです。  
JavaScriptで**DOM (Document Object Model)** を使用して作られています。   
DOMの基本ということで、特にフレームワークなどは使用せずにJavaScriptをベタ書きしてDOMを実現しています。  

今回はゲームということでブラウザ側のLocalStorageを用いたセーブ機能をつけました。  
プレイヤーの状態をJSON文字列にしてLocalStorageに保存しています。　　

## How to play
仕事や投資、不動産でお金を稼いでいくシミュレーションゲームです。  
最初の画面で適当な名前を入れてNewを押せばスタートできます。  
この世界では**1秒が1日**として経過します。
あなたは、ハンバーガーショップで働いていて、**所持金5万円**、**20歳**の状態からスタートです。  
左のハンバーガーアイコンをクリックするごとにお金を稼ぎます。最初は**1クリック25円**です。  

右のアイテムを購入することでより効率的にお金を稼げます。
一覧にアイテム名、値段、現在の所有個数、利益が書いてあります。

「Flip machine」はハンバーガー用のマシーンで、購入毎に25円ハンバーガーを作るクリック単価が上がります。  

「ETF Stock（ETF銘柄）」と「ETF Bonds（ETF債券）」は投資商品です。これらは今まで購入した総額のうち、利率％分が毎日の収入になります。ただし1円未満は切り捨てです。  
ETF Stockは毎回購入するごとに次回の購入価格が10%値上がりするようになっていますので、注意してください。  

それ以外のアイテムは全て不動産です。  
これらは購入することで毎日一定の利益を得ます。  

投資商品を除いて、各アイテムには所有個数制限があります。制限はそのアイテムを一覧から選択して購入画面でMax purchasesを見ると確認できます。  

画面右下の水色円形矢印ボタンでデータのリセットができます。  
これを押して確認するとデータが初期化されてしまうのでご注意ください。  

リセットボタンの右隣にセーブボタンがあります。  
データをセーブしたら、また最初の画面で同じプレイヤー名を入力することで続きからゲームを開始できます。

## Screenshots
<img width="1440" alt="Screen Shot 2021-10-21 at 18 00 05" src="https://user-images.githubusercontent.com/78921835/138246633-a8b950f1-7ee4-4fc5-a6b7-0e68f0e1ae75.png">

<img width="1440" alt="Screen Shot 2021-10-21 at 18 01 11" src="https://user-images.githubusercontent.com/78921835/138246826-1655f5d6-3428-49be-a604-790f35d35909.png">

<img width="1440" alt="Screen Shot 2021-10-21 at 18 02 40" src="https://user-images.githubusercontent.com/78921835/138246876-a9df3c63-fc3f-466f-adf5-9704153e94c6.png">

## URL
https://hir01105.github.io/Clicker-Empire-Game/
