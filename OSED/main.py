import re
import sys

def parse_solidity_code(solidity_code):
    chain_func_pattern = re.compile(r'@chain\((.*?)\)\s*(function\s+.*?{.*?})', re.DOTALL)
    shared_var_pattern = re.compile(r'shared\s+(.*?)\s+with\s+(.*?);', re.S)

    chain_functions = chain_func_pattern.findall(solidity_code)
    shared_vars = shared_var_pattern.findall(solidity_code)

    chains = {}
    for chain, func in chain_functions:
        if chain not in chains:
            chains[chain] = {'functions': [], 'variables': []}
        chains[chain]['functions'].append(func)

    for var, chain_list in shared_vars:
        var = var.strip()
        for chain in chain_list.split(','):
            chain = chain.strip()
            if chain not in chains:
                chains[chain] = {'functions': [], 'variables': []}
            chains[chain]['variables'].append(var)

    return chains, shared_vars

def generate_contracts(solidity_code):
    chains, shared_vars = parse_solidity_code(solidity_code)
    contracts = {}

    all_functions = set()
    for chain_data in chains.values():
        all_functions.update([f.split()[1].split('(')[0] for f in chain_data['functions']])

    for chain, data in chains.items():
        contract_code = "pragma solidity ^0.8.19;\n\ncontract Counter {\n"
        for var in data['variables']:
            contract_code += f"    {var};\n"

        for func in data['functions']:
            function_name = func.split()[1].split('(')[0]
            contract_code += f"    {func}\n"
            if chain == 'polygon' and any(var in func for var, _ in shared_vars):
                contract_code += f"        SendBack('ethereum', '{function_name}');\n    \n\n"

        if chain == 'ethereum':
            missing_funcs = all_functions - set(f.split()[1].split('(')[0] for f in data['functions'])
            for func in missing_funcs:
                contract_code += f"    function {func}() public {{\n"
                contract_code += f"        SendForward('polygon', '{func}');\n    }}\n\n"

        contract_code += "}\n"
        contracts[chain] = contract_code

    return contracts

def main():
    if len(sys.argv) != 2:
        print("Usage: python script.py <filename>")
        sys.exit(1)

    filename = sys.argv[1]
    with open(filename, 'r') as file:
        solidity_code = file.read()

    contracts = generate_contracts(solidity_code)

    for chain, contract in contracts.items():
        with open(f'main.{chain}.sol', 'w') as file:
            file.write(contract)
            print(f"Contract for {chain} saved as main.{chain}.sol")

if __name__ == "__main__":
    main()
