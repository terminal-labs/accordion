# Made by Michael Verhulst <michael@terminallabs.com> as a
# simple template system to automate the generation of repetitious 
# HTML/CSS code.
# Last edtied: 05-15-2013
#
import json

def start_section(start_accordion_section, title, number):
    accordion_section = start_accordion_section
    
    accordion_section = accordion_section.replace('{{accord}}', 
                                                  'accordion' + str(number))
    
    accordion_section = accordion_section.replace('{{title}}', title)
    
    accordion_section = accordion_section.replace('{{arrow}}', 
                                                  'accordion_arrow_' + 
                                                  str(number))
    
    accordion_section = accordion_section.replace('{{accod_content}}', 
                                                   'accordion' + str(number)
                                                    + 'content')
    return accordion_section
    
def end_section(end_accordion_section, content_name):
    return end_accordion_section.replace('{{content_name}}',content_name)

def write_accord_items(file_obj,start_accordion_section,
                       end_accordion_section,
                       row_template, 
                       items, 
                       title, 
                       number):
                           
    file_obj.write(start_section(start_accordion_section, title, number))

    for item in items:
        file_obj.write(row_template.replace('{{name}}',item))
        
    file_obj.write(end_section(end_accordion_section, 
                               '#accordion' + str(number) + 'content'))
                               
                               
def compile_html(accord_data,
                 header, 
                 footer,
                 row_template,
                 start_accordion_section,
                 end_accordion_section
                 ):

    file_obj = open('generated_index.html', 'wb')
    file_obj.write(header)
    
    index = 0
    for accord in accord_data:
        write_accord_items(file_obj, 
                       start_accordion_section,
                       end_accordion_section,
                       row_template, 
                       accord[1],
                       accord[0],
                       index)
        index += 1
    
    file_obj.write(footer)                                                      
    file_obj.close()
    
def load_data():
    file_obj = open('data.txt','rb')
    data_from_file = file_obj.read()
    accord_data = json.loads(data_from_file)
    return accord_data
                                                                         
def main():
    header = """<!DOCTYPE HTML>
    <html>
    <head>
    <title></title>
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="js/accordion.js"></script>
    </head>
    <body>
        <div id="accordion_container" class="accordion_container">
            <div class="accordion_header">shop by:</div>"""
            
    footer = """</div></body></html>"""

    row_template = """<div class="accordion_row">
            <div class="accordion_row_input">
                <input type="checkbox" name="{{name}}" id="{{name}}">
            </div>
            <div class="accordion_row_text">
                <label for="{{name}}">
                    {{name}}
                </label>
            </div>
           </div>"""
    
    start_accordion_section = """<div class="named_accordion_group">
            <div id="{{accord}}" class="accordion_title" 
                onselectstart="return false;">
                {{title}}
                <div id="{{arrow}}" class="accordion_arrow_down"></div>
            </div>
        <div id="{{accod_content}}" class="accordion_content">"""
        
    end_accordion_section = """<div class="accordion_row">
        <a onclick="clear_boxes('{{content_name}}');" 
        class="accordion_clear">( clear )</a>
        </div></div></div><!-- /named_accordion_group -->"""
    
    compile_html(load_data(),
             header, 
             footer,
             row_template,
             start_accordion_section,
             end_accordion_section)

if __name__ == "__main__":
    main()

