# -*- coding: utf-8 -*-

"""
.. module:: test_organization
"""

from django.test import TestCase, Client

from apps.volontulo.factories import User
from apps.volontulo.models import Organization, UserProfile
from apps.volontulo.serializers import OrganizationSerializer


class TestOrganizationSerializer(TestCase):

    """Test for organizations serializer."""

    def test_slug(self):
        """Test slug method."""
        organization = Organization(name='Organization Name 123')
        self.assertEqual(
            OrganizationSerializer().get_slug(organization),
            'organization-name-123',
        )

    def test_create(self):
        """Test create method"""
        self.client = Client()
        user = self.client.login(
            username='user@example',
            password='123user')
        org_payload = {
            'address': '61-287 Poznań, ul. Kawowa 6',
            'description': 'Jeszcze jedna organizacja',
            'name': 'Nazwa organizacji'}
        self.assertEqual(
            (OrganizationSerializer().create(org_payload)
             in user.userprofile.organizations.all()),
            True)
