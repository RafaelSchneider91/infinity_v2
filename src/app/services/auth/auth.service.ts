import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Exemplo com Firebase, pode ser outro serviço
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Usando compat version
import { AlunoService } from '../aluno/aluno.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private firestore: AngularFirestore,
    private alunoService: AlunoService  // Serviço para checar os alunos no backend


  ) {}

  // Verifica se o usuário está autenticado
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }


  
  // login(user: User): Promise<void> {
  //   return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
  //     .then(async (credential) => {
  //       if (credential.user) {
  //         const userId = credential.user.uid;
  
  //         try {
  //           // Faz a requisição para obter todos os usuários cadastrados
  //           const usuarios = await this.alunoService.getUsuarios().toPromise() || [];
  
  //           // Verifica se o id do usuário autenticado já existe no JSON
  //           const usuarioExistente = usuarios.find((aluno: any) => aluno.id === userId);
  //           const usuarioInstrutor = usuarios.find((aluno: any) => aluno.perfil === "instrutor");
            
  //           console.log(usuarioExistente)
  //           console.log(usuarioInstrutor)
  //           // console.log("Verificando o usuário instrutor existente:", usuarioInstrutor.perfil);
  
  //           if (usuarioExistente && usuarioInstrutor) {
  //               console.log('Usuário já cadastrado:', usuarioInstrutor.perfil);
  //               console.log('Redirecionando para /instrutor');
  //               this.router.navigate(['/instrutor']);  // Certifique-se de que isso está sendo atingido
  //           } else if (usuarioExistente){
  //               console.log('Redirecionando para /aluno');
  //               this.router.navigate(['/aluno']);
  //           } else {
  //               console.log('Usuário não cadastrado, redirecionando para cadastro.');
  //               this.router.navigate(['/cadastro-aluno']);          
  //           }
  
  //         } catch (error) {
  //           console.error('Erro ao verificar cadastro do usuário no AlunoService:', error);
  //         }
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Erro ao fazer login:', error);
  //     });
  // }
  login(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .catch(error => {
        console.error('Erro ao realizar o login:', error);
        throw error;  // Propaga o erro para a função chamadora
      });
  }
  
  
  register(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(async (credential) => {
        if (credential.user) {  // Verificação para garantir que credential.user não é nulo
          await this.firestore.collection('users').doc(credential.user.uid).set({
            type: 'usuario',  // Define sempre como 'usuario'
            email: user.email,
          });
        } else {
          // Tratar o caso em que credential.user é nulo
          console.error('Erro: O usuário é nulo');
          throw new Error('Erro: O usuário retornado é nulo');
        }
      })
      .catch(error => {
        console.error('Erro ao registrar usuário:', error);
        throw error;  // Propaga o erro para ser capturado na função que chamou
      });
  }
  

// register(user: User) {
//     return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
//       .then(async (credential) => {
//         if (credential.user) {  // Verificação para garantir que credential.user não é nulo
//           await this.firestore.collection('users').doc(credential.user.uid).set({
//             type: 'usuario',  // Define sempre como 'usuario'
//             email: user.email,
//           });
//         } else {
//           // Tratar o caso em que credential.user é nulo
//           console.error('Erro: O usuário é nulo');
//         }
//       })
//       .catch(error => {
//         console.error('Erro ao registrar usuário:', error);
//       });
//   }
  
  // Função para enviar o email de redefinição de senha
  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
  // Lógica de logout
  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']); // Redireciona para a página de login após logout
    });
  }

  getUserId(): Promise<string | null> {
    return this.afAuth.currentUser.then((user) => (user ? user.uid : null));
  }
}
