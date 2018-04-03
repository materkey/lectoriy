"""lectoriy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from core.views import login_view, UserViewSet
from lectoriy import settings
from comments.views import CommentViewSet


router = DefaultRouter()
router.register('comments', CommentViewSet, base_name='comment')
router.register('users', UserViewSet, base_name='user')

urlpatterns = [
    path('', RedirectView.as_view(url='accounts/login')),
    path('admin/', admin.site.urls),
    path('accounts/', include('core.urls', namespace='core')),
    path('social/', include('social_django.urls', namespace='social')),
    path('api/v1/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token)
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns