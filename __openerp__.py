# -*- coding: utf-8 -*-
{
    'name': "image_gallery",

    'summary': """
        In product templates of odoo there's an image_medium field(functional field) and an image field. So the image in image field is to be 		displayed in the gallery.
	The gallery will open when the user chooses records in the tree view and clicks on more --> open gallery. """,

    'description': """
        Long description of module's purpose
    """,

    'author': "RDJ INGENO-CONSULTING",
    'website': "http://www.rdj-ingeno-consulting.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'Others',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'images': [],
    'depends': ['web'],
    'qweb': [],
    'data': [
             'views/gallery.xml',
    ],
    'demo': [
    ],
    'test': [
    ],
    'css': [
            'static/src/css/gallery_style.css',
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
}

