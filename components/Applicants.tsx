"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye, CheckCircle, XCircle, Clock, Mail, Phone, User } from 'lucide-react';

export default function Applicants({ userId }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, [userId]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      // Aquí deberías hacer la llamada a tu API
      const response = await fetch(`/api/applicants?userId=${userId}`);
      if (!response.ok) throw new Error('Error fetching applicants');
      const data = await response.json();
      setApplicants(data);
    } catch (err) {
      setError('Error al cargar los postulantes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error('Error updating status');
      
      // Actualizar el estado local
      setApplicants(prevApplicants =>
        prevApplicants.map(applicant => ({
          ...applicant,
          applications: applicant.applications.map(app =>
            app.id === applicationId ? { ...app, status } : app
          )
        }))
      );
    } catch (err) {
      console.error('Error updating application status:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted':
        return 'Aceptado';
      case 'rejected':
        return 'Rechazado';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Pendiente';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Cargando postulantes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <Button onClick={fetchApplicants} className="mt-2">
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  if (applicants.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">No hay postulantes aún</p>
        <p>Cuando alguien se postule a tus ideas, aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applicants.map((applicant) => (
        <Card key={applicant.id} className="border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={applicant.profileImage} />
                  <AvatarFallback>
                    {applicant.name?.charAt(0) || applicant.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {applicant.name || 'Usuario Anónimo'}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{applicant.email}</p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver perfil
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Perfil del postulante</DialogTitle>
                    <DialogDescription>
                      Información detallada del postulante
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={applicant.profileImage} />
                        <AvatarFallback>
                          {applicant.name?.charAt(0) || applicant.email.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {applicant.name || 'Usuario Anónimo'}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Mail className="w-4 h-4 mr-1" />
                          {applicant.email}
                        </div>
                        {applicant.phone && (
                          <div className="flex items-center text-gray-600 mt-1">
                            <Phone className="w-4 h-4 mr-1" />
                            {applicant.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    {applicant.bio && (
                      <div>
                        <h4 className="font-medium mb-2">Biografía</h4>
                        <p className="text-gray-700">{applicant.bio}</p>
                      </div>
                    )}
                    {applicant.skills && applicant.skills.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Habilidades</h4>
                        <div className="flex flex-wrap gap-2">
                          {applicant.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Postulaciones:</h4>
              {applicant.applications.map((application) => (
                <div
                  key={application.id}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 mb-1">
                        {application.idea.title}
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        {application.idea.description?.substring(0, 100)}...
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{getStatusText(application.status)}</span>
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Postulado el {new Date(application.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {application.message && (
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-medium text-gray-700 mb-1">Mensaje:</p>
                      <p className="text-sm text-gray-600">{application.message}</p>
                    </div>
                  )}
                  
                  {application.status === 'pending' && (
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => updateApplicationStatus(application.id, 'accepted')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aceptar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateApplicationStatus(application.id, 'rejected')}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}