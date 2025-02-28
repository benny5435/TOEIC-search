

# # from flask import Flask, request, jsonify
# # import pandas as pd

# # app = Flask(__name__)

# # # 讀取試算表數據
# # df = pd.read_excel('TOEIC_score.xlsx')

# # # 假設的標題行在第2行（根據實際資料調整）
# # header_row = 2
# # df.columns = df.iloc[header_row]
# # df = df[header_row + 1:]

# # # 去除欄位名稱前後的空格
# # df.columns = df.columns.str.strip()

# # # 設定索引為「學號」欄位
# # df.set_index('學號', inplace=True)

# # @app.route('/', methods=['GET', 'POST'])
# # def index():
# #     results = None
# #     if request.method == 'POST':
# #         student_id = request.form['student_id']
# #         if student_id in df.index:
# #             student_data = df.loc[student_id]
# #             results = {
# #                 'listening_score': round(float(student_data[3]), 2),
# #                 'reading_score': round(float(student_data[4]), 2),
# #                 'total_score': round(float(student_data[5]), 2),
# #             }
# #         else:
# #             results = {
# #                 'error': '找不到該學號'
# #             }
# #         return jsonify(results)
# #     return "請使用表單提交學號查詢成績。"

# # if __name__ == '__main__':
# #     app.run(debug=True)

# from flask import Flask, request, jsonify, send_from_directory
# import pandas as pd

# app = Flask(__name__)

# # 讀取試算表數據
# df = pd.read_excel('TOEIC_score.xlsx')

# # 假設的標題行在第2行（根據實際資料調整）
# header_row = 2
# df.columns = df.iloc[header_row]
# df = df[header_row + 1:]

# # 去除欄位名稱前後的空格
# df.columns = df.columns.str.strip()

# # 設定索引為「學號」欄位
# df.set_index('學號', inplace=True)

# @app.route('/')
# def index():
#     return send_from_directory('', 'front.html')

# @app.route('/search', methods=['POST'])
# def search():
#     data = request.get_json()
#     student_id = data.get('student_id')
#     if student_id in df.index:
#         student_data = df.loc[student_id]
#         results = {
#             'listening_score': round(float(student_data[3]), 2),
#             'reading_score': round(float(student_data[4]), 2),
#             'total_score': round(float(student_data[5]), 2),
#         }
#     else:
#         results = {
#             'error': '找不到該學號'
#         }
#     return jsonify(results)

# if __name__ == '__main__':
#     app.run(debug=True)

