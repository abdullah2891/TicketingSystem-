# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.template import loader
from django.http import HttpResponse


def Index(request):
    template = loader.get_template('frontend/index.html')
    return HttpResponse(template.render({}, request))
