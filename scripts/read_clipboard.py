import pyperclip

def read_clipboard():
    try:
        return pyperclip.paste()
    except pyperclip.PyperclipException:
        return None

def read_image():
    try:
        return pyperclip.paste()
    except pyperclip.PyperclipException:
        return None

def main():
    print(read_clipboard())

if __name__ == '__main__':
    main()
