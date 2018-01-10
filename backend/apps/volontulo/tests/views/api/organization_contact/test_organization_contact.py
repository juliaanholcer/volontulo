import json
from unittest import mock

from django.test import TestCase

from apps.volontulo.factories import OrganizationFactory


class TestOrganizationContact(TestCase):
    def setUp(self):
        self.org = OrganizationFactory.create()

    def test_404_if_org_does_not_exist(self):
        res = self.client.post('/api/organizations/org-5/999/contact')
        self.assertEquals(res.status_code, 404)

    def test_400_if_payload_incorrect(self):
        res = self.client.post(
            '/api/organizations/org/{}/contact'.format(self.org.id),
            json.dumps({
                'name': 'Jon Snow',
                'email': 'iknownothing-winterfell.com',
                'phone_no': '99999',
                'message': 'Winter is comming!'
            }),
            content_type='application/json'
        )
        self.assertEquals(res.status_code, 400)

    def test_405_if_method_not_alowed(self):
        res = self.client.get(
            '/api/organizations/org/{}/contact'.format(self.org.id))
        self.assertEquals(res.status_code, 405)

    def test_200(self):
        res = self.client.post(
            '/api/organizations/org/{}/contact'.format(self.org.id),
            json.dumps({
                'name': 'Jon Snow',
                'email': 'iknownothing@winterfell.com',
                'phone_no': '999999999',
                'message': 'Winter is comming!'
            }),
            content_type='application/json'
        )
        self.assertEquals(res.status_code, 200)

    def test_send_email(self):
        with mock.patch('apps.volontulo.views.api.send_mail') as mock_send:
            res = self.client.post(
                '/api/organizations/org/{}/contact'.format(self.org.id),
                json.dumps({
                    'name': 'Jon Snow',
                    'email': 'iknownothing@winterfell.com',
                    'phone_no': '999999999',
                    'message': 'Winter is comming!'
                }),
                content_type='application/json'
            )

        self.assertEquals(res.status_code, 200)
        self.assertEquals(mock_send.call_count, 1)
