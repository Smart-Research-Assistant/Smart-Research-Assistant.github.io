from flask import Flask, request, render_template, jsonify
import os
from werkzeug.utils import secure_filename
from rag_pipeline import analyze_document

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './uploads'
ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'pdf' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['pdf']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        result = analyze_document(filepath)  # Call your RAG function
        return jsonify({"message": result})
    else:
        return jsonify({"error": "Invalid file format"}), 400

if __name__ == '__main__':
    app.run(debug=True)
