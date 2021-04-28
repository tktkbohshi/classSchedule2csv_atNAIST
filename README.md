# class_schedule_to_csv_for_google_calender
## About  
naistシラバスの科目ページから授業名，日程等を科目ごとに一括で取り込み，Google Calenderでインポートできるcsvファイルとしてエクスポートするchrome拡張機能です．

## Installation  
任意のディレクトリで  
```
git clone https://github.com/tktkbohshi/naist_class_calender.git
```
もしくはCode->Download ZipからZipファイルをダウンロード後，任意のディレクトリで解凍  
その後，[chrome://extensions](chrome://extensions) にアクセス，右上からデベロッパーモードを有効化，「パッケージ化されていない拡張機能を読み込む」からダウンロードしたフォルダを選択・開く．
## Usage  
シラバスの科目ページにて拡張機能のアイコン（画像左）をクリックする．  
<img width="67" alt="スクリーンショット 2021-04-28 20 55 44" src="https://user-images.githubusercontent.com/62731095/116399643-1c4df880-a864-11eb-903e-f455e061f2d5.png">  
その後，科目名等がポップアップに正常に表示されていることを確認してポップアップ下部の「.csvファイルをダウンロード」ボタンをクリック，任意のディレクトリにcsvを保存する．  
このcsvをGoogle Calenderで読み込む．  
現在は授業名+回数，各回のスケジュール，講義室情報及び該当科目のシラバスURLがcsvに書き込まれるようになってます．  
## その他  
issue報告，プルリク歓迎です．
