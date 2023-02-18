from libhwp import HWPReader
import os

import hml_equation_parser as hp

# hwp = HWPReader('2023학년도 수능 수학영역.hwp')
hwp = HWPReader(os.path.join(os.path.dirname(__file__), 'test.hwp'))

# 모든 문단 출력 (표, 캡션 포함)

for paragraph in hwp.find_all('paragraph'):
    print(paragraph)

# equation = hwp.find_all('equation')[0]
# print(equation.script)
# print(hp.eq2latex(equation.script))

# # 모든 문단 출력 (표, 캡션 제외, 수식 포함)
