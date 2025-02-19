from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# 讀取試算表數據
df = pd.read_excel('TOEIC_score.xlsx')

# 設定索引為「學號」欄位
df.set_index('學號', inplace=True)

@app.route('/', methods=['GET', 'POST'])
def index():
    results = None
    if request.method == 'POST':
        student_id = request.form['student_id']
        if student_id in df.index:
            student_data = df.loc[student_id]
            results = {
                'listening_score': round(float(student_data[3]), 2),
                'reading_score': round(float(student_data[4]), 2),
                'total_score': round(float(student_data[5]), 2),
            }
        else:
            results = {
                'error': '找不到該學號'
            }
if __name__ == '__main__':
    app.run(debug=True)