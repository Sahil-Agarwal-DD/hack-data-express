import sys

def _date(sql):
    return sql

if __name__ == '__main__':
    if sys.argv[1] == 'date':
        result = _date(sys.argv[2])
        print(result)