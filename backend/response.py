from flask import Flask, jsonify

def api_error(error, code=400):
    return jsonify({
        "success": False,
        "data": None,
        "error": error
    }), code

def api_success(data=None, code=200):
    return jsonify({
        "success": True,
        "data": data,
        "error": None
    }), code
