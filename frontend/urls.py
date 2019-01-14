from django.conf.urls import include, url 
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views
from .views import Index



urlpatterns  = {
    url(r'', Index, name='Index')
}



urlpatterns = format_suffix_patterns(urlpatterns)
