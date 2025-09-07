import java.util.*; 

public class addNumber {

    public static int caculateSum(int a, int b) {
        int sum = a + b;
        System.out.println("The sum is: " + sum);
        return sum;
    }

    public static int caculateProduct(int a, int b) {
        int mul = a * b;
        
        return mul;
    }

    public static int caculateFactorial(int n) {
        int fact = 1;

        for(int i = n; i > 0; i--) {
            fact *= i;
        }
        
        return fact;
    }
    
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        
        int a = sc.nextInt();
        int b = sc.nextInt();

        caculateSum( a,  b);

        int product = caculateProduct(a, b);
        System.out.println("The Product is: " + product);

        //Factorial of n
        System.out.print("Enter a number to find factorial: ");
        int n = sc.nextInt();
        if( n < 0){
            System.out.println("Factorial is not defined for negative numbers");
            return;
        }
        int fact = caculateFactorial(n);
        System.out.println("The Factorial is: " + fact);

    }
}
